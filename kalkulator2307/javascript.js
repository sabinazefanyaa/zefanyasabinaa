document.addEventListener('DOMContentLoaded', () => {
    const resultInput = document.getElementById('result');
    const binOutput = document.getElementById('bin-output');
    const octOutput = document.getElementById('oct-output');
    const hexOutput = document.getElementById('hex-output');

    const baseInput1 = document.getElementById('base-input');
    const baseInput2 = document.getElementById('base-input-2');
    const baseSelect1 = document.getElementById('base-select');
    const baseSelect2 = document.getElementById('base-select-2');
    const desimalInput = document.getElementById('desimal-input');

    const btnAdd = document.getElementById('btn-base-add');
    const btnSubtract = document.getElementById('btn-base-subtract');
    const btnMultiply = document.getElementById('btn-base-multiply');
    const btnDivide = document.getElementById('btn-base-divide');
    const btnClearBase = document.getElementById('btn-clear-base');
    const copyBtn = document.getElementById('copy-result');

    const btnKonversiDesimal = document.getElementById('btn-konversi-desimal');
    const btnOperasiBasis = document.getElementById('btn-operasi-basis');
    const panelKonversiDesimal = document.getElementById('konversi-desimal-panel');
    const panelOperasiBasis = document.getElementById('operasi-basis-panel');
    const bitSelect = document.getElementById('bit-select');

    function updateDisplay(val) {
        resultInput.value = val;
    }

    function clearDisplay() {
        updateDisplay('0');
        binOutput.textContent = '';
        octOutput.textContent = '';
        hexOutput.textContent = '';
        baseInput1.value = '';
        baseInput2.value = '';
        desimalInput.value = '';
    }

    function parseBaseValue(value, base) {
        value = value.trim();
        if (base === 2 && /^[01]+$/.test(value)) return parseInt(value, 2);
        if (base === 8 && /^[0-7]+$/.test(value)) return parseInt(value, 8);
        if (base === 10 && /^-?[0-9]+$/.test(value)) return parseInt(value, 10);
        if (base === 16 && /^[0-9a-fA-F]+$/.test(value)) return parseInt(value, 16);
        throw new Error("Input tidak valid");
    }

    function tampilkanHasil(nilai) {
        const bit = parseInt(bitSelect.value || "0");
        updateDisplay(nilai);

        let biner = nilai >= 0 ? nilai.toString(2) : (nilai >>> 0).toString(2);
        if (bit > 0) {
            biner = biner.padStart(bit, '0');
        }

        binOutput.textContent = biner;
        octOutput.textContent = (nilai >>> 0).toString(8);
        hexOutput.textContent = (nilai >>> 0).toString(16).toUpperCase();
    }

    desimalInput.addEventListener('input', () => {
        let val = Number(desimalInput.value);
        if (!isNaN(val)) {
            tampilkanHasil(val);
        } else {
            clearDisplay();
        }
    });

    function operasi(operator) {
        try {
            const val1 = parseBaseValue(baseInput1.value, parseInt(baseSelect1.value));
            const val2 = parseBaseValue(baseInput2.value, parseInt(baseSelect2.value));
            let hasil = 0;

            if (operator === 'add') hasil = val1 + val2;
            else if (operator === 'sub') hasil = val1 - val2;
            else if (operator === 'mul') hasil = val1 * val2;
            else if (operator === 'div') hasil = val2 !== 0 ? val1 / val2 : 'Error';

            tampilkanHasil(hasil);
        } catch (e) {
            updateDisplay("Error");
        }
    }

    btnAdd.addEventListener('click', () => operasi('add'));
    btnSubtract.addEventListener('click', () => operasi('sub'));
    btnMultiply.addEventListener('click', () => operasi('mul'));
    btnDivide.addEventListener('click', () => operasi('div'));
    btnClearBase.addEventListener('click', clearDisplay);

    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(resultInput.value);
        alert("Hasil disalin!");
    });

    btnKonversiDesimal.addEventListener('click', () => {
        panelKonversiDesimal.classList.add('active');
        panelOperasiBasis.classList.remove('active');
        clearDisplay();
    });

    btnOperasiBasis.addEventListener('click', () => {
        panelKonversiDesimal.classList.remove('active');
        panelOperasiBasis.classList.add('active');
        clearDisplay();
    });

    btnKonversiDesimal.click(); // Set default panel saat load
});
