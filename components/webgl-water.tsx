'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const vertexShader = `
  void main() {
    gl_Position = vec4( position, 1.0 );
  }
`

const fragmentShader = `
  uniform float iGlobalTime;
  uniform vec2 iResolution;

  const int NUM_STEPS = 8;
  const float PI    = 3.1415;
  const float EPSILON = 1e-3;
  #define EPSILON_NRM (0.1 / iResolution.x)

  // sea variables
  const int ITER_GEOMETRY = 3;
  const int ITER_FRAGMENT = 5;
  const float SEA_HEIGHT = 0.6;
  const float SEA_CHOPPY = 1.0;
  const float SEA_SPEED = 1.0;
  const float SEA_FREQ = 0.16;
  const vec3 SEA_BASE = vec3(0.0, 0.4, 0.45);
  const vec3 SEA_WATER_COLOR = vec3(0.4, 0.8, 0.7);
  #define SEA_TIME (iGlobalTime * SEA_SPEED)
  mat2 octave_m = mat2(1.6,1.2,-1.2,1.6);

  mat3 fromEuler(vec3 ang) {
    vec2 a1 = vec2(sin(ang.x),cos(ang.x));
    vec2 a2 = vec2(sin(ang.y),cos(ang.y));
    vec2 a3 = vec2(sin(ang.z),cos(ang.z));
    mat3 m;
    m[0] = vec3(
      a1.y*a3.y+a1.x*a2.x*a3.x,
      a1.y*a2.x*a3.x+a3.y*a1.x,
      -a2.y*a3.x
    );
    m[1] = vec3(-a2.y*a1.x,a1.y*a2.y,a2.x);
    m[2] = vec3(
      a3.y*a1.x*a2.x+a1.y*a3.x,
      a1.x*a3.x-a1.y*a3.y*a2.x,
      a2.y*a3.y
    );
    return m;
  }

  float hash( vec2 p ) {
    float h = dot(p,vec2(127.1,311.7)); 
    return fract(sin(h)*43758.5453123);
  }

  float noise( in vec2 p ) {
    vec2 i = floor(p);
    vec2 f = fract(p);  
    vec2 u = f * f * (3.0 - 2.0 * f);
    return -1.0 + 2.0 * mix(
      mix(
        hash(i + vec2(0.0,0.0)
      ), 
      hash(i + vec2(1.0,0.0)), u.x),
      mix(hash(i + vec2(0.0,1.0) ), 
      hash(i + vec2(1.0,1.0) ), u.x), 
      u.y
    );
  }

  float diffuse(vec3 n,vec3 l,float p) {
    return pow(dot(n,l) * 0.4 + 0.6,p);
  }

  float specular(vec3 n,vec3 l,vec3 e,float s) {    
    float nrm = (s + 8.0) / (3.1415 * 8.0);
    return pow(max(dot(reflect(e,n),l),0.0),s) * nrm;
  }

  vec3 getSkyColor(vec3 e) {
    e.y = max(e.y, 0.0);
    vec3 ret;
    ret.x = pow(1.0 - e.y, 2.0);
    ret.y = 1.0 - e.y;
    ret.z = 0.6+(1.0 - e.y) * 0.4;
    return ret;
  }

  float sea_octave(vec2 uv, float choppy) {
    uv += noise(uv);         
    vec2 wv = 1.0 - abs(sin(uv));
    vec2 swv = abs(cos(uv));    
    wv = mix(wv, swv, wv);
    return pow(1.0 - pow(wv.x * wv.y, 0.65), choppy);
  }

  float map(vec3 p) {
    float freq = SEA_FREQ;
    float amp = SEA_HEIGHT;
    float choppy = SEA_CHOPPY;
    vec2 uv = p.xz; 
    uv.x *= 0.75;

    float d, h = 0.0;    
    for(int i = 0; i < ITER_GEOMETRY; i++) {        
      d = sea_octave((uv + SEA_TIME) * freq, choppy);
      d += sea_octave((uv - SEA_TIME) * freq, choppy);
      h += d * amp;        
      uv *= octave_m;
      freq *= 1.9; 
      amp *= 0.22;
      choppy = mix(choppy, 1.0, 0.2);
    }
    return p.y - h;
  }

  float map_detailed(vec3 p) {
      float freq = SEA_FREQ;
      float amp = SEA_HEIGHT;
      float choppy = SEA_CHOPPY;
      vec2 uv = p.xz;
      uv.x *= 0.75;

      float d, h = 0.0;    
      for(int i = 0; i < ITER_FRAGMENT; i++) {        
        d = sea_octave((uv+SEA_TIME) * freq, choppy);
        d += sea_octave((uv-SEA_TIME) * freq, choppy);
        h += d * amp;        
        uv *= octave_m;
        freq *= 1.9; 
        amp *= 0.22;
        choppy = mix(choppy,1.0,0.2);
      }
      return p.y - h;
  }

  vec3 getSeaColor(
    vec3 p,
    vec3 n, 
    vec3 l, 
    vec3 eye, 
    vec3 dist
  ) {  
    float fresnel = 1.0 - max(dot(n,-eye),0.0);
    fresnel = pow(fresnel,3.0) * 0.65;

    vec3 reflected = getSkyColor(reflect(eye,n));    
    vec3 refracted = SEA_BASE + diffuse(n,l,80.0) * SEA_WATER_COLOR * 0.12; 

    vec3 color = mix(refracted,reflected,fresnel);

    float atten = max(1.0 - dot(dist,dist) * 0.001, 0.0);
    color += SEA_WATER_COLOR * (p.y - SEA_HEIGHT) * 0.18 * atten;

    color += vec3(specular(n,l,eye,60.0));

    return color;
  }

  vec3 getNormal(vec3 p, float eps) {
    vec3 n;
    n.y = map_detailed(p);    
    n.x = map_detailed(vec3(p.x+eps,p.y,p.z)) - n.y;
    n.z = map_detailed(vec3(p.x,p.y,p.z+eps)) - n.y;
    n.y = eps;
    return normalize(n);
  }

  float heightMapTracing(vec3 ori, vec3 dir, out vec3 p) {  
    float tm = 0.0;
    float tx = 1000.0;    
    float hx = map(ori + dir * tx);

    if(hx > 0.0) {
      return tx;   
    }

    float hm = map(ori + dir * tm);    
    float tmid = 0.0;
    for(int i = 0; i < NUM_STEPS; i++) {
      tmid = mix(tm,tx, hm/(hm-hx));                   
      p = ori + dir * tmid;                   
      float hmid = map(p);
      if(hmid < 0.0) {
        tx = tmid;
        hx = hmid;
      } else {
        tm = tmid;
        hm = hmid;
       }
    }
    return tmid;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / iResolution.xy;
    uv = uv * 2.0 - 1.0;
    uv.x *= iResolution.x / iResolution.y;    
    float time = iGlobalTime * 0.3;

    // ray
    vec3 ang = vec3(
      sin(time*3.0)*0.1,sin(time)*0.2+0.3,time
    );    
    vec3 ori = vec3(0.0,3.5,time*5.0);
    vec3 dir = normalize(
      vec3(uv.xy,-2.0)
    );
    dir.z += length(uv) * 0.15;
    dir = normalize(dir);

    // tracing
    vec3 p;
    heightMapTracing(ori,dir,p);
    vec3 dist = p - ori;
    vec3 n = getNormal(
      p,
      dot(dist,dist) * EPSILON_NRM
    );
    vec3 light = normalize(vec3(0.0,1.0,0.8)); 

    // color
    float isSea = pow(smoothstep(0.0,-0.05,dir.y),0.3);
    // When isSea is 0 (sky), the color doesn't matter since alpha will be 0
    vec3 color = getSeaColor(p,n,light,dir,dist);

    // post
    gl_FragColor = vec4(pow(color,vec3(0.75)), isSea);
  }
`

export function WebGLWater() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return

    const fov = 30
    const clock = new THREE.Clock()

    const timeUniform = {
      iGlobalTime: {
        type: 'f',
        value: 0.1
      },
      iResolution: {
        type: 'v2',
        value: new THREE.Vector2(1200, 800)
      }
    }

    const scene = new THREE.Scene()
    
    // We only create the scene exactly as the shader requires
    const camera = new THREE.PerspectiveCamera(
      fov,
      1200 / 800,
      1,
      10000
    )
    camera.position.x = 20
    camera.position.y = 10
    camera.position.z = 20
    camera.lookAt(scene.position)
    scene.add(camera)

    const material = new THREE.ShaderMaterial({
      uniforms: timeUniform,
      vertexShader,
      fragmentShader,
      transparent: true
    })

    const geometry = new THREE.PlaneGeometry(1200, 800, 40)
    const water = new THREE.Mesh(geometry, material)
    scene.add(water)

    // The provided script had a yellow sphere, we skip that to keep only the water

    const renderer = new THREE.WebGLRenderer({ alpha: true })
    renderer.setSize(1200, 800)
    renderer.setPixelRatio(window.devicePixelRatio || 1)
    
    mountRef.current.appendChild(renderer.domElement)

    let animationId: number | null = null
    let isRendering = false

    const render = () => {
      if (!isRendering) return
      // timeUniform.iGlobalTime.value += clock.getDelta() // Using getElapsedTime makes it smoother
      timeUniform.iGlobalTime.value = clock.getElapsedTime()
      renderer.render(scene, camera)
      animationId = requestAnimationFrame(render)
    }

    // Performance optimization: Pause WebGL rendering when component is off-screen
    // This prevents the main thread from waking up continuously when the user has scrolled past
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!isRendering) {
            isRendering = true
            render()
          }
        } else {
          isRendering = false
          if (animationId !== null) {
            cancelAnimationFrame(animationId)
            animationId = null
          }
        }
      })
    }, {
      rootMargin: '100px', // Start rendering slightly before it comes into view
      threshold: 0
    })

    observer.observe(mountRef.current)

    const currentMount = mountRef.current
    return () => {
      observer.disconnect()
      if (animationId !== null) {
        cancelAnimationFrame(animationId)
      }
      if (currentMount && renderer.domElement.parentNode === currentMount) {
        currentMount.removeChild(renderer.domElement)
      }
      renderer.dispose()
      geometry.dispose()
      material.dispose()
    }
  }, [])

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />
}
