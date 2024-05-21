document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('crudForm');
    const entriesTable = document.getElementById('entriesTable').getElementsByTagName('tbody')[0];
    let entries = [];

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const date = document.getElementById('date').value;
        const where = document.getElementById('where').value;
        const what = document.getElementById('what').value;

        const entry = { id: Date.now(), name, date, where, what };
        entries.push(entry);
        renderTable();

        form.reset();
    });

    function renderTable() {
        entriesTable.innerHTML = '';
        entries.forEach(entry => {
            const row = entriesTable.insertRow();
            row.setAttribute('data-id', entry.id);

            const nameCell = row.insertCell(0);
            const dateCell = row.insertCell(1);
            const whereCell = row.insertCell(2);
            const whatCell = row.insertCell(3);
            const actionsCell = row.insertCell(4);

            nameCell.textContent = entry.name;
            dateCell.textContent = entry.date;
            whereCell.textContent = entry.where;
            whatCell.textContent = entry.what;

            const editButton = document.createElement('button');
            editButton.className = 'btn btn-sm btn-warning me-2';
            editButton.textContent = 'Edit';
            editButton.onclick = () => editEntry(entry.id);
            actionsCell.appendChild(editButton);

            const deleteButton = document.createElement('button');
            deleteButton.className = 'btn btn-sm btn-danger';
            deleteButton.textContent = 'Delete';
            deleteButton.onclick = () => deleteEntry(entry.id);
            actionsCell.appendChild(deleteButton);
        });
    }

    function editEntry(id) {
        const entry = entries.find(entry => entry.id === id);
        document.getElementById('name').value = entry.name;
        document.getElementById('date').value = entry.date;
        document.getElementById('where').value = entry.where;
        document.getElementById('what').value = entry.what;

        form.onsubmit = function(event) {
            event.preventDefault();
            entry.name = document.getElementById('name').value;
            entry.date = document.getElementById('date').value;
            entry.where = document.getElementById('where').value;
            entry.what = document.getElementById('what').value;

            renderTable();
            form.reset();
            form.onsubmit = defaultSubmitHandler;
        };
    }

    function deleteEntry(id) {
        entries = entries.filter(entry => entry.id !== id);
        renderTable();
    }

    function defaultSubmitHandler(event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const date = document.getElementById('date').value;
        const where = document.getElementById('where').value;
        const what = document.getElementById('what').value;

        const entry = { id: Date.now(), name, date, where, what };
        entries.push(entry);
        renderTable();

        form.reset();
    }

    form.onsubmit = defaultSubmitHandler;
});
