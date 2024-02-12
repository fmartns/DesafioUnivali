var items = JSON.parse(localStorage.getItem('items')) || {};

function createEditForm(item, id) {
    var addItemForm = document.getElementById('addItem');
    var editForm = addItemForm.cloneNode(true);
    editForm.id = 'addItem';
    editForm.querySelector('button[type="submit"]').textContent = 'Salvar';

    for (let prop in item) {
        var input = editForm.querySelector('[name="' + prop + '"]');
        if (input) {
            if (input.type === 'checkbox') {
                input.checked = item[prop] === 'true';
            } else {
                input.value = item[prop];
            }
        }
    }

    editForm.addEventListener('submit', function(e) {
        e.preventDefault();
        var formData = new FormData(editForm);
        var newItem = Object.fromEntries(formData.entries());
        items[id] = {...items[id], ...newItem};
        localStorage.setItem('items', JSON.stringify(items));
        location.reload();
    });

    return editForm;
}

window.onload = function() {
    var itemsDiv = document.getElementById('items');

    var table = document.createElement('table');
    var header = document.createElement('tr');
    var headers = ['Nome', 'Medida', 'Preço', 'Peresivel', 'Data de Vencimento', 'Data de Fabricação', 'Editar', 'Excluir'];
    headers.forEach(function(headerText) {
        var th = document.createElement('th');
        th.textContent = headerText;
        header.appendChild(th);
    });
    table.appendChild(header);

    for (let id in items) {
        let tr = document.createElement('tr');
    
        for (let prop in items[id]) {
            if (prop !== 'measureUnit' && prop !== 'measureWithUnit') {
                var td = document.createElement('td');
                td.textContent = items[id][prop] || 'Não informado';
                td.style.textAlign = 'left'; // Adiciona o alinhamento à esquerda
                tr.appendChild(td);
            }
        }
    
        var editTd = document.createElement('td');
        var editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.style.textAlign = 'center'; // Alinha o texto do botão ao centro
        editButton.style.marginRight = '10px'; // Adiciona margem à direita do botão Editar
        editButton.addEventListener('click', function() {
            var item = items[id];
            var editForm = createEditForm(item, id);

            var modalContent = document.querySelector('#editModal .modal-content');
            while (modalContent.firstChild) {
                modalContent.removeChild(modalContent.firstChild);
            }

            modalContent.appendChild(editForm);

            var modal = document.getElementById('editModal');
            modal.style.display = 'block';

            var closeButton = document.getElementsByClassName('close')[0];
            closeButton.onclick = function() {
                modal.style.display = 'none';
            };

            window.onclick = function(event) {
                if (event.target == modal) {
                    modal.style.display = 'none';
                }
            };
        });
        editTd.appendChild(editButton);
        tr.appendChild(editTd);

        var deleteTd = document.createElement('td');
        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Excluir';
        deleteButton.style.textAlign = 'center'; // Alinha o texto do botão ao centro
        deleteButton.addEventListener('click', function() {
            if (confirm('Tem certeza de que deseja excluir este item?')) {
                delete items[id];
                localStorage.setItem('items', JSON.stringify(items));
                location.reload();
            }
        });
        deleteTd.appendChild(deleteButton);
        tr.appendChild(deleteTd);

        table.appendChild(tr);
    }

    itemsDiv.appendChild(table);
};