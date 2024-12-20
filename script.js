document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'admin' && password === 'admin') {
        document.getElementById('login-page').style.display = 'none';
        document.getElementById('main-page').style.display = 'flex';
        updateClock();
        updateDate();
        loadSuppliers();
    } else {
        alert('Invalid username or password');
    }
});

document.getElementById('supplier-form').addEventListener('submit', function(event) {
    event.preventDefault();
    addSupplier();
});

document.getElementById('save-data').addEventListener('click', saveSuppliers);
document.getElementById('delete-data').addEventListener('click', deleteSuppliers);
document.getElementById('restore-data').addEventListener('click', loadSuppliers);
document.getElementById('print-data').addEventListener('click', printSuppliers);

function updateClock() {
    const clockElement = document.getElementById('clock');
    const now = new Date();
    const hours = now.getHours() % 12 || 12;
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    clockElement.textContent = `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function updateDate() {
    const dateElement = document.getElementById('date');
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const gregorianDate = now.toLocaleDateString('ar-EG', options);

    const hijriDate = new Intl.DateTimeFormat('ar-SA-u-ca-islamic', options).format(now);
    dateElement.textContent = `التاريخ الميلادي: ${gregorianDate}\nالتاريخ الهجري: ${hijriDate}`;
}

function addSupplier() {
    const supplierId = document.getElementById('supplier-id').value;
    const supplierName = document.getElementById('supplier-name').value;
    const supplierPhone = document.getElementById('supplier-phone').value;
    const supplierAddress = document.getElementById('supplier-address').value;
    const supplierType = document.getElementById('supplier-type').value;

    const tableBody = document.querySelector('#supplier-table tbody');
    const newRow = tableBody.insertRow();
    newRow.insertCell(0).textContent = supplierId;
    newRow.insertCell(1).textContent = supplierName;
    newRow.insertCell(2).textContent = supplierPhone;
    newRow.insertCell(3).textContent = supplierAddress;
    newRow.insertCell(4).textContent = supplierType;

    document.getElementById('supplier-form').reset();
}

function saveSuppliers() {
    const tableBody = document.querySelector('#supplier-table tbody');
    const suppliers = [];
    for (let i = 0; i < tableBody.rows.length; i++) {
        const row = tableBody.rows[i];
        const supplier = {
            id: row.cells[0].textContent,
            name: row.cells[1].textContent,
            phone: row.cells[2].textContent,
            address: row.cells[3].textContent,
            type: row.cells[4].textContent
        };
        suppliers.push(supplier);
    }
    localStorage.setItem('suppliers', JSON.stringify(suppliers));
    alert('تم حفظ البيانات بنجاح');
}

function loadSuppliers() {
    const suppliers = JSON.parse(localStorage.getItem('suppliers')) || [];
    const tableBody = document.querySelector('#supplier-table tbody');
    tableBody.innerHTML = '';
    suppliers.forEach(supplier => {
        const newRow = tableBody.insertRow();
        newRow.insertCell(0).textContent = supplier.id;
        newRow.insertCell(1).textContent = supplier.name;
        newRow.insertCell(2).textContent = supplier.phone;
        newRow.insertCell(3).textContent = supplier.address;
        newRow.insertCell(4).textContent = supplier.type;
    });
}

function deleteSuppliers() {
    localStorage.removeItem('suppliers');
    const tableBody = document.querySelector('#supplier-table tbody');
    tableBody.innerHTML = '';
    alert('تم حذف البيانات بنجاح');
}

function printSuppliers() {
    window.print();
}

setInterval(updateClock, 1000);
setInterval(updateDate, 1000);
