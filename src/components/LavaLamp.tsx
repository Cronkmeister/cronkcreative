import { useEffect, useRef } from "react";

interface LavaLampProps {
  isDarkMode: boolean;
}

const LavaLamp = ({ isDarkMode }: LavaLampProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    try {
      const canvas = canvasRef.current;
      if (!canvas) {
        console.error("Canvas ref is null");
        return;
      }

      console.log("Canvas element found:", canvas);

      const gl = canvas.getContext("webgl", {
        alpha: true,
        antialias: true,
        preserveDrawingBuffer: true,
      });

      if (!gl) {
        console.error("WebGL not supported or context creation failed");
        return;
      }

      console.log("WebGL context created successfully");

      // Set initial size
      const updateCanvasSize = () => {
        if (!canvas || !gl) {
          console.error("updateCanvasSize: canvas or gl is null");
          return;
        }
        const rect = canvas.getBoundingClientRect();
        console.log("Canvas rect:", rect);
        const dpr = window.devicePixelRatio || 1;
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        console.log("Canvas size set to:", canvas.width, canvas.height);
        gl.viewport(0, 0, canvas.width, canvas.height);
      };

      // Initial size update
      updateCanvasSize();

      // Update size on resize
      window.addEventListener("resize", updateCanvasSize);

      const initialRect = canvas.getBoundingClientRect();
      const initialDpr = window.devicePixelRatio || 1;
      let width = initialRect.width * initialDpr;
      let height = initialRect.height * initialDpr;

      console.log("Initial dimensions:", width, height);

      let mouse = { x: width / 2, y: height / 2 };
      function onMouseMove(e: MouseEvent) {
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        mouse.x = (e.clientX - rect.left) * dpr;
        mouse.y = (e.clientY - rect.top) * dpr;
      }
      window.addEventListener("mousemove", onMouseMove);

      const circleColors = [
        [18 / 255, 113 / 255, 1.0],
        [221 / 255, 74 / 255, 1.0],
        [100 / 255, 220 / 255, 1.0],
        [200 / 255, 50 / 255, 50 / 255],
        [180 / 255, 180 / 255, 50 / 255],
        [140 / 255, 100 / 255, 1.0],
      ];

      let circles: Array<{
        x: number;
        y: number;
        radius: number;
        color: number[];
        vx: number;
        vy: number;
        interactive: boolean;
      }> = [];

      function initCircles() {
        circles = [];
        const baseRadius = (width + height) * 0.2;
        for (let i = 0; i < 5; i++) {
          const radius = baseRadius;
          const x = Math.random() * width;
          const y = Math.random() * height;
          const speedMultiplier = Math.random() * 4 + 1;
          const vx = (Math.random() - 0.5) * speedMultiplier;
          const vy = (Math.random() - 0.5) * speedMultiplier;
          circles.push({
            x,
            y,
            radius,
            color: circleColors[i],
            vx,
            vy,
            interactive: false,
          });
        }

        // interactive circle
        const interactiveRadius = (width + height) * 0.1;
        circles.push({
          x: width / 2,
          y: height / 2,
          radius: interactiveRadius,
          color: circleColors[5],
          vx: 0,
          vy: 0,
          interactive: true,
        });
      }

      initCircles();

      function createShader(type: number, source: string) {
        if (!gl) {
          console.error("createShader: gl is null");
          return null;
        }
        const shader = gl.createShader(type);
        if (!shader) {
          console.error("createShader: failed to create shader");
          return null;
        }
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
          console.error("Shader compile error:", gl.getShaderInfoLog(shader));
          gl.deleteShader(shader);
          return null;
        }
        console.log(
          type === gl.VERTEX_SHADER
            ? "Vertex shader compiled successfully"
            : "Fragment shader compiled successfully"
        );
        return shader;
      }

      const vertexSrc = `
        attribute vec2 a_position;
        varying vec2 v_uv;
        void main(void) {
          v_uv = a_position * 0.5 + 0.5; 
          v_uv.y = 1.0 - v_uv.y; 
          gl_Position = vec4(a_position, 0.0, 1.0);
        }
      `;

      // Restore the original fragment shader
      const fragmentSrc = `
        precision mediump float;
        varying vec2 v_uv;

        uniform vec2 u_resolution;
        uniform bool u_darkMode;
        uniform int u_circleCount;
        uniform vec3 u_circlesColor[6];
        uniform vec3 u_circlesPosRad[6];
        uniform vec2 u_mouse;

        void main(void) {
            vec2 st = v_uv * u_resolution;
            st += u_mouse * 0.0;

            vec3 topColor, bottomColor;
            if (u_darkMode) {
                // Dark mode colors
                topColor = vec3(20.0/255.0, 0.0, 40.0/255.0);
                bottomColor = vec3(0.0, 5.0/255.0, 20.0/255.0);
            } else {
                // Light mode colors (original)
                topColor = vec3(108.0/255.0, 0.0, 162.0/255.0);
                bottomColor = vec3(0.0, 17.0/255.0, 82.0/255.0);
            }
            vec3 bgColor = mix(topColor, bottomColor, st.y / u_resolution.y);

            float fieldSum = 0.0;
            vec3 weightedColorSum = vec3(0.0);
            
            for (int i = 0; i < 6; i++) {
                if (i >= u_circleCount) { break; }
                vec3 posRad = u_circlesPosRad[i];
                vec2 cPos = vec2(posRad.r, posRad.g);
                float radius = posRad.b;
                float dist = length(st - cPos);
                float sigma = radius * 0.5;
                float val = exp(- (dist * dist) / (2.0 * sigma * sigma));
                fieldSum += val;
                weightedColorSum += u_circlesColor[i] * val;
            }

            vec3 finalCirclesColor = vec3(0.0);
            if (fieldSum > 0.0) {
              finalCirclesColor = weightedColorSum / fieldSum;
            }

            float intensity = pow(fieldSum, 1.4);
            vec3 finalColor = mix(bgColor, finalCirclesColor, clamp(intensity, 0.0, 1.0));
            gl_FragColor = vec4(finalColor, 1.0);
        }
      `;

      const vertShader = createShader(gl.VERTEX_SHADER, vertexSrc);
      if (!vertShader) {
        console.error("vertShader is null");
        return;
      }
      const fragShader = createShader(gl.FRAGMENT_SHADER, fragmentSrc);
      if (!fragShader) {
        console.error("fragShader is null");
        return;
      }

      const program = gl.createProgram();
      if (!program) {
        console.error("Program creation failed");
        return;
      }
      gl.attachShader(program, vertShader);
      gl.attachShader(program, fragShader);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error("Program link error:", gl.getProgramInfoLog(program));
        return;
      }
      console.log("Shader program linked successfully");

      gl.useProgram(program);

      // Uniform locations (must be after useProgram)
      const u_resolution = gl.getUniformLocation(program, "u_resolution");
      const u_darkMode = gl.getUniformLocation(program, "u_darkMode");
      const u_circleCount = gl.getUniformLocation(program, "u_circleCount");
      const u_circlesColor = gl.getUniformLocation(program, "u_circlesColor");
      const u_circlesPosRad = gl.getUniformLocation(program, "u_circlesPosRad");
      const u_mouse = gl.getUniformLocation(program, "u_mouse");

      console.log("Uniform locations:", {
        u_resolution,
        u_darkMode,
        u_circleCount,
        u_circlesColor,
        u_circlesPosRad,
        u_mouse,
      });

      if (
        !u_resolution ||
        !u_circleCount ||
        !u_circlesColor ||
        !u_circlesPosRad ||
        !u_mouse
      ) {
        console.error("One or more uniforms are missing:", {
          u_resolution,
          u_circleCount,
          u_circlesColor,
          u_circlesPosRad,
          u_mouse,
        });
        return;
      }

      const quadBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
      const vertices = new Float32Array([
        -1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1,
      ]);
      gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

      const a_position = gl.getAttribLocation(program, "a_position");
      console.log("a_position location:", a_position);
      if (a_position === -1) {
        console.error("a_position attribute not found in shader");
        return;
      }
      gl.enableVertexAttribArray(a_position);
      gl.vertexAttribPointer(a_position, 2, gl.FLOAT, false, 0, 0);
      console.log("a_position attribute enabled and pointer set");

      // Add this log to see if we reach here
      console.log("Reached after attribute setup");
      console.log("About to start render loop...");
      console.log("Starting render loop");

      // Restore updateCircles logic
      function updateCircles() {
        for (let i = 0; i < circles.length; i++) {
          const c = circles[i];
          if (!c.interactive) {
            c.x += c.vx;
            c.y += c.vy;
            if (c.x - c.radius > width) c.x = -c.radius;
            if (c.x + c.radius < 0) c.x = width + c.radius;
            if (c.y - c.radius > height) c.y = -c.radius;
            if (c.y + c.radius < 0) c.y = height + c.radius;
          } else {
            c.x += (mouse.x - c.x) * 0.1;
            c.y += (mouse.y - c.y) * 0.1;
          }
        }
      }

      render();

      function render() {
        if (!gl || !canvas) {
          console.error("GL context or canvas is null in render");
          return;
        }
        updateCircles();
        const rect = canvas.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        width = rect.width * dpr;
        height = rect.height * dpr;
        gl.viewport(0, 0, width, height);
        gl.clearColor(0.1, 0.1, 0.1, 0.5);
        gl.clear(gl.COLOR_BUFFER_BIT);
        if (!program) {
          console.error("Shader program is null");
          return;
        }
        gl.useProgram(program);
        // Set uniforms
        if (
          u_resolution &&
          u_circleCount &&
          u_circlesColor &&
          u_circlesPosRad &&
          u_mouse &&
          u_darkMode
        ) {
          gl.uniform1i(u_circleCount, circles.length);
          gl.uniform2f(u_resolution, width, height);
          gl.uniform2f(u_mouse, mouse.x, mouse.y);
          gl.uniform1i(u_darkMode, isDarkMode ? 1 : 0);
          let colorsArr = [];
          let posRadArr = [];
          for (let i = 0; i < 6; i++) {
            if (i < circles.length) {
              const c = circles[i];
              colorsArr.push(c.color[0], c.color[1], c.color[2]);
              posRadArr.push(c.x, c.y, c.radius);
            } else {
              colorsArr.push(0, 0, 0);
              posRadArr.push(0, 0, 0);
            }
          }
          gl.uniform3fv(u_circlesColor, new Float32Array(colorsArr));
          gl.uniform3fv(u_circlesPosRad, new Float32Array(posRadArr));
        } else {
          console.error("Uniforms missing in render");
        }

        gl.drawArrays(gl.TRIANGLES, 0, 6);
        const err = gl.getError();
        if (err !== gl.NO_ERROR) {
          console.error("WebGL error after drawArrays:", err);
        }
        requestAnimationFrame(render);
      }
    } catch (e) {
      console.error("LavaLamp useEffect error:", e);
    }
  }, [isDarkMode]);

  return (
    <div className="relative w-full h-full">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.8 }}
      />
    </div>
  );
};

export default LavaLamp;
