# Python-code-runner

### A simple web-based Python code execution environment using Pyodide. Run Python code directly in your browser without any backend server.
![image](https://github.com/user-attachments/assets/dd7e0319-2b6d-4ed3-b540-5bfb1c5d54df)


## Demo Features

- Run Python code in browser
- Real-time code execution
- Simple and clean interface
- Loading animation while Pyodide initializes

## Quick Start

1. Clone the repository:
```bash
git clone git@github.com:RADEKWRLD/Python-code-runner.git
```

2. Open `index.html` in your web browser

3. Wait for Pyodide to load (you'll see a loading spinner)

4. Start writing and running Python code!

## Core Implementation

### 1. Pyodide Initialization
```javascript
async function initPyodide() {
  try {
    const pyodide = await loadPyodide();
    document.getElementById('loading').style.display = 'none';
    return pyodide;
  } catch (error) {
    console.error('Failed to load Pyodide:', error);
  }
}
```

### 2. Code Execution
```javascript
async function runPythonCode(pyodide, code) {
  try {
    const result = await pyodide.runPythonAsync(code);
    return result;
  } catch (error) {
    return error.message;
  }
}
```

### 3. Loading Animation
```css
.loading-spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
```

### 4. Event Handling
```javascript
document.getElementById('runButton').addEventListener('click', async () => {
  const code = editor.getValue();
  const output = await runPythonCode(pyodide, code);
  displayOutput(output);
});
```

## How It Works

This project uses [Pyodide](https://pyodide.org/) to run Python code in the browser. The core workflow is:

1. **Loading Phase**: 
   - Initialize Pyodide with a loading animation
   - Create a Python runtime environment in the browser

2. **Execution Phase**:
   - Capture code from the editor
   - Execute code using Pyodide's runPythonAsync
   - Handle outputs and errors
   - Display results to the user

3. **UI Interaction**:
   - Loading spinner shows during initialization
   - Editor for code input
   - Run button triggers code execution
   - Output display area shows results or errors

## Technologies Used

- HTML
- CSS
- JavaScript
- Pyodide

## License

This project is open source and available under the MIT License.

## Project Link

[https://github.com/RADEKWRLD/Python-code-runner](https://github.com/RADEKWRLD/Python-code-runner)

