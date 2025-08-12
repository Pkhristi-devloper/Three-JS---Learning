import fragmentShader from './shader.glsl?raw';

console.log("Shader code:", fragmentShader);

document.body.innerHTML = `
    <h1>Imported GLSL Shader:</h1>
    <pre style="background:#222; color:#0f0; padding:10px;">${fragmentShader}</pre>
`;
