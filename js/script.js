/* Formata o campo de nome para aceitar apenas letras */

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('name').addEventListener('input', function(e) {
        var regex = /^[a-zA-Z ]*$/;
        if (!regex.test(this.value)) {
            this.value = this.value.replace(/[^a-zA-Z ]/g, '');
            alert('Apenas letras são permitidas neste campo')
        }
    });
});

/* Formata os campos de medidas de acordo com a unidade de medida */

document.addEventListener('DOMContentLoaded', function() {
    var measureUnit = document.getElementById('measureUnit');
    var measure = document.getElementById('measure');

    // Desativa o campo de medida por padrão
    measure.disabled = true;

    measureUnit.addEventListener('change', function() {
        measure.value = ''; // Limpa o campo de medida

        // Ativa o campo de medida quando uma unidade é selecionada
        measure.disabled = this.value === '' ? true : false;

        switch (this.value) {
            case '':
                measure.placeholder = 'Selecione uma unidade de medida';
                break;
            case 'l':
                measure.placeholder = 'Medida em litros';
                measure.addEventListener('input', function(e) {
                    this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');
                    if (this.value.split('.')[1]?.length > 3) {
                        this.value = this.value.slice(0, -1);
                    }
                    this.value = this.value + ' lt';
                });
                break;
            case 'kg':
                measure.placeholder = 'Medida em quilogramas';
                measure.addEventListener('input', function(e) {
                    this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');
                    if (this.value.split('.')[1]?.length > 3) {
                        this.value = this.value.slice(0, -1);
                    }
                    this.value = this.value + ' kg';
                });
                break;
            case 'un':
                measure.placeholder = 'Medida em unidades';
                measure.addEventListener('input', function(e) {
                    this.value = this.value.replace(/[^0-9]/g, '');
                    this.value = this.value + ' un';
                });
                break;
        }
    });
});

/* Ativa o campo de data de validade quando o produto é perecível */

document.addEventListener('DOMContentLoaded', function() {
    var perishable = document.getElementById('perishable');
    var dueDate = document.getElementById('dueDate');

    // Desativa o campo de data de validade por padrão
    dueDate.disabled = true;

    perishable.addEventListener('change', function() {
        dueDate.value = ''; // Limpa o campo de data de validade

        // Ativa o campo de data de validade quando o produto é perecível
        dueDate.disabled = this.checked ? false : true;
    });
});

/* Mascara o campo de valor em reais */

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('price').addEventListener('input', function(e) {
        this.value = this.value.replace(/\D/g, '');
        this.value = this.value.replace(/(\d{2})$/, ',$1');
        this.value = this.value.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
        this.value = 'R$ ' + this.value;
    });
});

/* Valida se a data de vencimento é superior a de fabricação */

document.addEventListener('DOMContentLoaded', function() {
    let dueDate = document.getElementById('dueDate');
    let fabDate = document.getElementById('fabDate');

    function checkDates() {
        if (new Date(dueDate.value) < new Date(fabDate.value)) {
            alert('A data de validade não pode ser menor que a data de fabricação');
            dueDate.value = '';
        }
    }

    dueDate.addEventListener('change', checkDates);
    fabDate.addEventListener('change', checkDates);
});

/* Transformar em JSON e armazenar em LocalStorage  */

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('addItem').addEventListener('submit', function(e) {
        e.preventDefault(); // Impede o envio padrão do formulário

        var form = e.target;
        var formData = new FormData(form);

        var item = Object.fromEntries(formData.entries()); // Transforma os dados do formulário em um objeto

        var items = JSON.parse(localStorage.getItem('items')) || {}; // Recupera os itens existentes do localStorage como um objeto

        var key = Date.now().toString(); // Gera uma chave única para o item
        item.id = key; // Adiciona um ID ao item
        items[key] = item; // Adiciona o novo item ao objeto de itens

        localStorage.setItem('items', JSON.stringify(items)); // Armazena o objeto de itens atualizado no localStorage
    });

    // Aqui você pode adicionar o código para exibir os itens armazenados no LocalStorage
});
