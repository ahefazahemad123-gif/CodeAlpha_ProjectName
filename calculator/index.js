 const display = document.getElementById('display');
  let currentInput = '';
  let resultDisplayed = false;

  function updateDisplay() {
    display.textContent = currentInput || '0';
  }

  function isOperator(char) {
    return ['+', '-', '*', '/'].includes(char);
  }

  function handleInput(value) {
    if (resultDisplayed) {
      if (isOperator(value)) {
        resultDisplayed = false;
      } else {
        currentInput = '';
        resultDisplayed = false;
      }
    }

    if (value === '.') {
      // Prevent multiple decimals in the current number chunk
      const lastNumber = currentInput.split(/[\+\-\*\/]/).pop();
      if (lastNumber.includes('.')) return;
    }

    // Prevent two operators in a row
    if (isOperator(value)) {
      if (currentInput === '' && value !== '-') return; // allow negative at start
      const lastChar = currentInput.slice(-1);
      if (isOperator(lastChar)) {
        currentInput = currentInput.slice(0, -1) + value;
        updateDisplay();
        return;
      }
    }

    currentInput += value;
    updateDisplay();
  }

  function calculateResult() {
    try {
      // Evaluate expression safely
      let expr = currentInput.replace(/÷/g, '/').replace(/×/g, '*');
      const evalResult = Function('"use strict";return (' + expr + ')')();
      currentInput = String(evalResult);
      updateDisplay();
      resultDisplayed = true;
    } catch (e) {
      display.textContent = 'Error';
      currentInput = '';
    }
  }

  function clearInput() {
    currentInput = '';
    resultDisplayed = false;
    updateDisplay();
  }

  document.querySelectorAll('.buttons button').forEach(button => {
    button.addEventListener('click', () => {
      const value = button.getAttribute('data-value');
      if (button.id === 'clear') {
        clearInput();
      } else if (button.id === 'equals') {
        calculateResult();
      } else {
        handleInput(value);
      }
    });
  });

  // Keyboard support
  window.addEventListener('keydown', e => {
    const allowedKeys = '0123456789+-*/.';
    if (allowedKeys.includes(e.key)) {
      e.preventDefault();
      handleInput(e.key);
    } else if (e.key === 'Enter' || e.key === '=') {
      e.preventDefault();
      calculateResult();
    } else if (e.key === 'Backspace') {
      e.preventDefault();
      currentInput = currentInput.slice(0, -1);
      updateDisplay();
    } else if (e.key.toLowerCase() === 'c') {
      e.preventDefault();
      clearInput();
    }
  });