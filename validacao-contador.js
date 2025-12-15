// ===== VARIÁVEIS GLOBAIS =====
let selectedRows = new Set();
let currentPage = 1;
let totalPages = 3;
let itemsPerPage = 5;
let filteredData = [];

// Dados mockados para demonstração
const mockData = [
    {
        id: 1,
        dataEnvio: '12/11/2025 14:30',
        empresa: 'ABC Construções Ltda',
        tipoSolicitacao: 'Cadastro Funcionário',
        funcionario: 'João Silva',
        detalhes: 'Admissão - Pedreiro',
        status: 'pendente',
        setor: 'Construção'
    },
    {
        id: 2,
        dataEnvio: '11/11/2025 16:45',
        empresa: 'XYZ Serviços S.A.',
        tipoSolicitacao: 'Férias',
        funcionario: 'Maria Santos',
        detalhes: 'Período: 15/12 a 03/01',
        status: 'validado',
        setor: 'Serviços'
    },
    {
        id: 3,
        dataEnvio: '10/11/2025 09:20',
        empresa: 'DEF Comércio Ltda',
        tipoSolicitacao: 'Rescisão',
        funcionario: 'Pedro Oliveira',
        detalhes: 'Demissão sem justa causa',
        status: 'enviado',
        setor: 'Comércio'
    },
    {
        id: 4,
        dataEnvio: '09/11/2025 11:15',
        empresa: 'ABC Construções Ltda',
        tipoSolicitacao: 'Folha Pagamento',
        funcionario: 'Ana Costa',
        detalhes: 'Horas extras + Faltas',
        status: 'pendente',
        setor: 'Construção'
    },
    {
        id: 5,
        dataEnvio: '08/11/2025 15:30',
        empresa: 'XYZ Serviços S.A.',
        tipoSolicitacao: 'Benefícios',
        funcionario: 'Carlos Mendes',
        detalhes: 'Alteração VT + VR',
        status: 'rejeitado',
        setor: 'Serviços'
    }
];

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('Sistema de Validação do Contador carregado');
    initializeSystem();
});

function initializeSystem() {
    filteredData = [...mockData];
    updateDashboard();
    updateTable();
    updateSelection();
    
    // Configurar data padrão (mês atual)
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    
    document.getElementById('dataInicio').value = firstDay.toISOString().split('T')[0];
    document.getElementById('dataFim').value = lastDay.toISOString().split('T')[0];
}

// ===== DASHBOARD =====
function updateDashboard() {
    const stats = calculateStats(filteredData);
    
    document.getElementById('totalSolicitacoes').textContent = stats.total;
    document.getElementById('pendenteValidacao').textContent = stats.pendentes;
    document.getElementById('validados').textContent = stats.validados;
    document.getElementById('enviadosDominio').textContent = stats.enviados;
    
    // Atualizar contadores da tabela
    document.getElementById('showingCount').textContent = Math.min(itemsPerPage, filteredData.length);
    document.getElementById('totalCount').textContent = filteredData.length;
}

function calculateStats(data) {
    return {
        total: data.length,
        pendentes: data.filter(item => item.status === 'pendente').length,
        validados: data.filter(item => item.status === 'validado').length,
        enviados: data.filter(item => item.status === 'enviado').length
    };
}

// ===== INICIALIZAÇÃO DO BOTÃO DE VOLTAR =====
function initializeBackButton() {
    const backButton = document.querySelector('.btn-back');
    if (backButton) {
        backButton.addEventListener('click', function(e) {
            e.preventDefault();
            goBack();
        });
    }
}


function goBack() {
    try {
        window.location.href = 'dashboard.html';
    } catch (error) {
        window.history.back();
    }
}


// ===== FILTROS =====
function clearFilters() {
    document.getElementById('dataInicio').value = '';
    document.getElementById('dataFim').value = '';
    document.getElementById('empresa').value = '';
    document.getElementById('tipoSolicitacao').value = '';
    document.getElementById('status').value = '';
    document.getElementById('funcionario').value = '';
    
    filteredData = [...mockData];
    currentPage = 1;
    selectedRows.clear();
    updateDashboard();
    updateTable();
    updateSelection();
    
    showNotification('Filtros limpos com sucesso!', 'success');
}

function applyFilters() {
    const filters = {
        dataInicio: document.getElementById('dataInicio').value,
        dataFim: document.getElementById('dataFim').value,
        empresa: document.getElementById('empresa').value,
        tipoSolicitacao: document.getElementById('tipoSolicitacao').value,
        status: document.getElementById('status').value,
        funcionario: document.getElementById('funcionario').value.toLowerCase()
    };
    
    filteredData = mockData.filter(item => {
        // Filtro por data
        if (filters.dataInicio || filters.dataFim) {
            const itemDate = new Date(item.dataEnvio.split(' ')[0].split('/').reverse().join('-'));
            if (filters.dataInicio && itemDate < new Date(filters.dataInicio)) return false;
            if (filters.dataFim && itemDate > new Date(filters.dataFim)) return false;
        }
        
        // Filtro por empresa
        if (filters.empresa && !item.empresa.toLowerCase().includes(filters.empresa.toLowerCase())) {
            return false;
        }
        
        // Filtro por tipo de solicitação
        if (filters.tipoSolicitacao && !item.tipoSolicitacao.toLowerCase().includes(filters.tipoSolicitacao.toLowerCase())) {
            return false;
        }
        
        // Filtro por status
        if (filters.status && item.status !== filters.status) {
            return false;
        }
        
        // Filtro por funcionário
        if (filters.funcionario && !item.funcionario.toLowerCase().includes(filters.funcionario)) {
            return false;
        }
        
        return true;
    });
    
    currentPage = 1;
    selectedRows.clear();
    updateDashboard();
    updateTable();
    updateSelection();
    
    showNotification(`Filtros aplicados! ${filteredData.length} registros encontrados.`, 'info');
}

// ===== SELEÇÃO =====
function updateSelection() {
    const selectedCount = selectedRows.size;
    document.getElementById('selectedCount').textContent = selectedCount;
    document.getElementById('validateCount').textContent = selectedCount;
    document.getElementById('rejectCount').textContent = selectedCount;
    document.getElementById('sendCount').textContent = selectedCount;
    
    // Atualizar checkbox "Selecionar Todos"
    const selectAllCheckbox = document.getElementById('selectAllCheckbox');
    const visibleCheckboxes = document.querySelectorAll('.row-checkbox');
    const checkedCount = Array.from(visibleCheckboxes).filter(cb => cb.checked).length;
    
    if (checkedCount === 0) {
        selectAllCheckbox.indeterminate = false;
        selectAllCheckbox.checked = false;
    } else if (checkedCount === visibleCheckboxes.length) {
        selectAllCheckbox.indeterminate = false;
        selectAllCheckbox.checked = true;
    } else {
        selectAllCheckbox.indeterminate = true;
    }
}

function toggleSelectAll() {
    const selectAllCheckbox = document.getElementById('selectAllCheckbox');
    const visibleCheckboxes = document.querySelectorAll('.row-checkbox');
    
    visibleCheckboxes.forEach(checkbox => {
        checkbox.checked = selectAllCheckbox.checked;
        const row = checkbox.closest('tr');
        const id = parseInt(row.dataset.id);
        
        if (selectAllCheckbox.checked) {
            selectedRows.add(id);
        } else {
            selectedRows.delete(id);
        }
    });
    
    updateSelection();
}

function selectAllVisible() {
    const visibleCheckboxes = document.querySelectorAll('.row-checkbox');
    
    visibleCheckboxes.forEach(checkbox => {
        checkbox.checked = true;
        const row = checkbox.closest('tr');
        const id = parseInt(row.dataset.id);
        selectedRows.add(id);
    });
    
    updateSelection();
    showNotification('Todos os registros visíveis foram selecionados!', 'info');
}

function deselectAll() {
    const visibleCheckboxes = document.querySelectorAll('.row-checkbox');
    
    visibleCheckboxes.forEach(checkbox => {
        checkbox.checked = false;
        const row = checkbox.closest('tr');
        const id = parseInt(row.dataset.id);
        selectedRows.delete(id);
    });
    
    document.getElementById('selectAllCheckbox').checked = false;
    updateSelection();
    showNotification('Seleção removida de todos os registros!', 'info');
}

// ===== TABELA =====
function updateTable() {
    const tableBody = document.getElementById('tableBody');
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageData = filteredData.slice(startIndex, endIndex);
    
    tableBody.innerHTML = '';
    
    pageData.forEach(item => {
        const row = createTableRow(item);
        tableBody.appendChild(row);
    });
    
    updatePagination();
}

function createTableRow(item) {
    const row = document.createElement('tr');
    row.dataset.id = item.id;
    
    const statusBadge = getStatusBadge(item.status);
    const actionsHtml = getActionsHtml(item);
    const [date, time] = item.dataEnvio.split(' ');
    
    row.innerHTML = `
        <td><input type="checkbox" class="row-checkbox" onchange="handleRowSelection(${item.id})" ${selectedRows.has(item.id) ? 'checked' : ''}></td>
        <td>
            ${date}<br>
            <small>${time}</small>
        </td>
        <td>
            ${item.empresa}<br>
            <small>${item.setor}</small>
        </td>
        <td>${item.tipoSolicitacao}</td>
        <td>${item.funcionario}</td>
        <td>${item.detalhes}</td>
        <td>${statusBadge}</td>
        <td class="actions-icons">${actionsHtml}</td>
    `;
    
    return row;
}

function handleRowSelection(id) {
    const checkbox = document.querySelector(`tr[data-id="${id}"] .row-checkbox`);
    
    if (checkbox.checked) {
        selectedRows.add(id);
    } else {
        selectedRows.delete(id);
    }
    
    updateSelection();
}

function getStatusBadge(status) {
    const statusConfig = {
        'pendente': { class: 'badge-status-pending', text: 'Pendente' },
        'validado': { class: 'badge-status-validated', text: 'Validado' },
        'rejeitado': { class: 'badge-status-rejected', text: 'Rejeitado' },
        'enviado': { class: 'badge-status-sent', text: 'Enviado' }
    };
    
    const config = statusConfig[status] || { class: 'badge-status-pending', text: 'Desconhecido' };
    return `<span class="badge ${config.class}">${config.text}</span>`;
}

function getActionsHtml(item) {
    const actions = [
        `<button class="action-icon-btn" onclick="viewDetails(${item.id})" title="Visualizar">
            <i class="fas fa-eye"></i>
        </button>`
    ];
    
    switch (item.status) {
        case 'pendente':
            actions.push(`
                <button class="action-icon-btn validate" onclick="validateSingle(${item.id})" title="Validar">
                    <i class="fas fa-check"></i>
                </button>
            `);
            actions.push(`
                <button class="action-icon-btn reject" onclick="rejectSingle(${item.id})" title="Rejeitar">
                    <i class="fas fa-times"></i>
                </button>
            `);
            break;
        case 'validado':
            actions.push(`
                <button class="action-icon-btn send" onclick="sendSingle(${item.id})" title="Enviar">
                    <i class="fas fa-rocket"></i>
                </button>
            `);
            break;
        case 'enviado':
            actions.push(`
                <button class="action-icon-btn report" onclick="viewReport(${item.id})" title="Relatório">
                    <i class="fas fa-chart-bar"></i>
                </button>
            `);
            break;
        case 'rejeitado':
            actions.push(`
                <button class="action-icon-btn edit" onclick="editRequest(${item.id})" title="Editar">
                    <i class="fas fa-edit"></i>
                </button>
            `);
            break;
    }
    
    return actions.join('');
}

// ===== PAGINAÇÃO =====
function updatePagination() {
    totalPages = Math.ceil(filteredData.length / itemsPerPage);
    
    // Atualizar informações de paginação
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, filteredData.length);
    
    document.querySelector('.pagination-info span').textContent = 
        `Mostrando ${startItem}-${endItem} de ${filteredData.length} registros`;
    
    // Atualizar botões de navegação
    const prevBtn = document.querySelector('.pagination-controls .btn-page');
    const nextBtn = document.querySelector('.pagination-controls .btn-page:last-child');
    
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages || totalPages === 0;
    
    // Atualizar números de página
    updatePageNumbers();
}

function updatePageNumbers() {
    const pageNumbersContainer = document.querySelector('.page-numbers');
    pageNumbersContainer.innerHTML = '';
    
    const startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(totalPages, startPage + 2);
    
    for (let i = startPage; i <= endPage; i++) {
        const button = document.createElement('button');
        button.className = `btn-page-number ${i === currentPage ? 'active' : ''}`;
        button.textContent = i;
        button.onclick = () => goToPage(i);
        pageNumbersContainer.appendChild(button);
    }
}

function previousPage() {
    if (currentPage > 1) {
        currentPage--;
        updateTable();
    }
}

function nextPage() {
    if (currentPage < totalPages) {
        currentPage++;
        updateTable();
    }
}

function goToPage(page) {
    if (page >= 1 && page <= totalPages) {
        currentPage = page;
        updateTable();
    }
}

// ===== AÇÕES INDIVIDUAIS =====
function viewDetails(id) {
    const item = mockData.find(item => item.id === id);
    if (!item) return;
    
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
        <div class="detail-section">
            <h4><i class="fas fa-info-circle"></i> Informações Gerais</h4>
            <div class="detail-grid">
                <div class="detail-item">
                    <strong>Data de Envio:</strong>
                    <span>${item.dataEnvio}</span>
                </div>
                <div class="detail-item">
                    <strong>Empresa:</strong>
                    <span>${item.empresa}</span>
                </div>
                <div class="detail-item">
                    <strong>Setor:</strong>
                    <span>${item.setor}</span>
                </div>
                <div class="detail-item">
                    <strong>Tipo de Solicitação:</strong>
                    <span>${item.tipoSolicitacao}</span>
                </div>
                <div class="detail-item">
                    <strong>Funcionário:</strong>
                    <span>${item.funcionario}</span>
                </div>
                <div class="detail-item">
                    <strong>Status:</strong>
                    <span>${getStatusBadge(item.status)}</span>
                </div>
                <div class="detail-item" style="grid-column: 1 / -1;">
                    <strong>Detalhes:</strong>
                    <span>${item.detalhes}</span>
                </div>
            </div>
        </div>
        
        <div class="detail-section">
            <h4><i class="fas fa-file-alt"></i> Dados Técnicos</h4>
            <div class="json-viewer">
                <pre>${JSON.stringify(item, null, 2)}</pre>
            </div>
        </div>
        
        <style>
            .detail-section {
                margin-bottom: 2rem;
            }
            
            .detail-section h4 {
                color: #2c3e50;
                margin-bottom: 1rem;
                display: flex;
                align-items: center;
                gap: 0.5rem;
                font-size: 1.1rem;
            }
            
            .detail-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 1rem;
            }
            
            .detail-item {
                display: flex;
                flex-direction: column;
                gap: 0.25rem;
            }
            
            .detail-item strong {
                color: #2c3e50;
                font-size: 0.9rem;
            }
            
            .detail-item span {
                color: #495057;
            }
            
            .json-viewer {
                background: #f8f9fa;
                border: 1px solid #e9ecef;
                border-radius: 8px;
                padding: 1rem;
                overflow-x: auto;
            }
            
            .json-viewer pre {
                margin: 0;
                font-family: 'Courier New', monospace;
                font-size: 0.85rem;
                color: #495057;
            }
        </style>
    `;
    
    document.getElementById('detailsModal').style.display = 'flex';
}

function validateSingle(id) {
    if (confirm('Confirma a validação desta solicitação?')) {
        updateItemStatus(id, 'validado');
        showNotification('Solicitação validada com sucesso!', 'success');
    }
}

function rejectSingle(id) {
    const reason = prompt('Motivo da rejeição (opcional):');
    if (reason !== null) {
        updateItemStatus(id, 'rejeitado');
        showNotification('Solicitação rejeitada!', 'warning');
    }
}

function sendSingle(id) {
    if (confirm('Confirma o envio desta solicitação para o domínio?')) {
        updateItemStatus(id, 'enviado');
        showNotification('Solicitação enviada para o domínio!', 'success');
    }
}

function editRequest(id) {
    showNotification('Funcionalidade de edição em desenvolvimento', 'info');
}

function viewReport(id) {
    showNotification('Relatório em desenvolvimento', 'info');
}

// ===== AÇÕES EM LOTE =====
function validateSelected() {
    if (selectedRows.size === 0) {
        showNotification('Nenhuma solicitação selecionada!', 'warning');
        return;
    }
    
    if (confirm(`Confirma a validação de ${selectedRows.size} solicitação(ões)?`)) {
        const count = selectedRows.size;
        selectedRows.forEach(id => updateItemStatus(id, 'validado'));
        selectedRows.clear();
        deselectAll();
        showNotification(`${count} solicitações validadas com sucesso!`, 'success');
    }
}

function rejectSelected() {
    if (selectedRows.size === 0) {
        showNotification('Nenhuma solicitação selecionada!', 'warning');
        return;
    }
    
    const reason = prompt('Motivo da rejeição (opcional):');
    if (reason !== null) {
        const count = selectedRows.size;
        selectedRows.forEach(id => updateItemStatus(id, 'rejeitado'));
        selectedRows.clear();
        deselectAll();
        showNotification(`${count} solicitações rejeitadas!`, 'warning');
    }
}

function sendSelected() {
    if (selectedRows.size === 0) {
        showNotification('Nenhuma solicitação selecionada!', 'warning');
        return;
    }
    
    if (confirm(`Confirma o envio de ${selectedRows.size} solicitação(ões) para o domínio?`)) {
        const count = selectedRows.size;
        selectedRows.forEach(id => updateItemStatus(id, 'enviado'));
        selectedRows.clear();
        deselectAll();
        showNotification(`${count} solicitações enviadas para o domínio!`, 'success');
    }
}

// ===== UTILITÁRIOS =====
function updateItemStatus(id, newStatus) {
    const item = mockData.find(item => item.id === id);
    if (item) {
        item.status = newStatus;
        
        // Atualizar dados filtrados se o item estiver presente
        const filteredItem = filteredData.find(item => item.id === id);
        if (filteredItem) {
            filteredItem.status = newStatus;
        }
        
        updateDashboard();
        updateTable();
    }
}

function closeModal() {
    document.getElementById('detailsModal').style.display = 'none';
}

function exportData() {
    showNotification('Exportação em desenvolvimento', 'info');
    
    // Simulação de exportação
    setTimeout(() => {
        showNotification('Relatório exportado com sucesso!', 'success');
    }, 2000);
}

function refreshData() {
    showNotification('Atualizando dados...', 'info');
    
    // Simulação de atualização
    setTimeout(() => {
        location.reload();
    }, 1000);
}

// ===== SISTEMA DE NOTIFICAÇÕES =====
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const icon = getNotificationIcon(type);
    
    notification.innerHTML = `
        <div class="notification-icon">${icon}</div>
        <div class="notification-content">
            <div class="notification-message">${message}</div>
        </div>
        <button class="notification-close" onclick="removeNotification(this)">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    const container = getOrCreateNotificationContainer();
    container.appendChild(notification);
    
    // Auto-remover após 5 segundos
    setTimeout(() => {
        removeNotification(notification.querySelector('.notification-close'));
    }, 5000);
}

function getOrCreateNotificationContainer() {
    let container = document.querySelector('.notification-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'notification-container';
        document.body.appendChild(container);
        
        // Adicionar estilos para notificações
        const style = document.createElement('style');
        style.textContent = `
            .notification-container {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 10001;
                display: flex;
                flex-direction: column;
                gap: 10px;
                pointer-events: none;
                max-width: 400px;
            }
            
            .notification {
                background: white;
                border-radius: 8px;
                padding: 1rem 1.5rem;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
                border-left: 4px solid;
                display: flex;
                align-items: center;
                gap: 1rem;
                animation: slideInRight 0.3s ease-out;
                pointer-events: auto;
            }
            
            .notification-success { border-left-color: #28a745; }
            .notification-error { border-left-color: #dc3545; }
            .notification-warning { border-left-color: #ffc107; }
            .notification-info { border-left-color: #17a2b8; }
            
            .notification-icon { font-size: 1.2rem; }
            .notification-success .notification-icon { color: #28a745; }
            .notification-error .notification-icon { color: #dc3545; }
            .notification-warning .notification-icon { color: #ffc107; }
            .notification-info .notification-icon { color: #17a2b8; }
            
            .notification-content { flex: 1; }
            .notification-message { color: #2c3e50; font-size: 0.95rem; }
            
            .notification-close {
                background: none;
                border: none;
                color: #6c757d;
                cursor: pointer;
                padding: 0.25rem;
                border-radius: 4px;
                transition: all 0.2s ease;
            }
            
            .notification-close:hover {
                background: rgba(108, 117, 125, 0.1);
                color: #2c3e50;
            }
            
            @keyframes slideInRight {
                from { opacity: 0; transform: translateX(100%); }
                to { opacity: 1; transform: translateX(0); }
            }
            
            @keyframes slideOutRight {
                from { opacity: 1; transform: translateX(0); }
                to { opacity: 0; transform: translateX(100%); }
            }
            
            @media (max-width: 768px) {
                .notification-container {
                    top: 10px;
                    right: 10px;
                    left: 10px;
                    max-width: none;
                }
                
                .notification {
                    margin: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    return container;
}

function getNotificationIcon(type) {
    const icons = {
        'success': '<i class="fas fa-check-circle"></i>',
        'error': '<i class="fas fa-exclamation-circle"></i>',
        'warning': '<i class="fas fa-exclamation-triangle"></i>',
        'info': '<i class="fas fa-info-circle"></i>'
    };
    return icons[type] || icons['info'];
}

function removeNotification(button) {
    const notification = button.closest('.notification');
    notification.style.animation = 'slideOutRight 0.3s ease-out forwards';
    setTimeout(() => {
        notification.remove();
    }, 300);
}

// ===== EVENT LISTENERS GLOBAIS =====
document.addEventListener('keydown', function(e) {
    // Fechar modal com ESC
    if (e.key === 'Escape') {
        closeModal();
    }
    
    // Atalhos de teclado
    if (e.ctrlKey) {
        switch (e.key) {
            case 'a':
                e.preventDefault();
                selectAllVisible();
                break;
            case 'f':
                e.preventDefault();
                document.getElementById('funcionario').focus();
                break;
            case 'r':
                e.preventDefault();
                refreshData();
                break;
        }
    }
});

// Fechar modal clicando fora
document.addEventListener('click', function(e) {
    const modal = document.getElementById('detailsModal');
    if (e.target === modal) {
        closeModal();
    }
});

// Atualizar seleção quando checkbox individual for alterado
document.addEventListener('change', function(e) {
    if (e.target.classList.contains('row-checkbox')) {
        updateSelection();
    }
});

// ===== FUNÇÕES DE INICIALIZAÇÃO ADICIONAIS =====
function initializeEventListeners() {
    // Event listeners para filtros
    document.getElementById('dataInicio').addEventListener('change', function() {
        if (this.value && document.getElementById('dataFim').value) {
            applyFilters();
        }
    });
    
    document.getElementById('dataFim').addEventListener('change', function() {
        if (this.value && document.getElementById('dataInicio').value) {
            applyFilters();
        }
    });
    
    // Enter para aplicar filtros
    document.getElementById('funcionario').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            applyFilters();
        }
    });
}

// Chamar inicialização de event listeners
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
});

// ===== FUNÇÕES DE VALIDAÇÃO =====
function validateFilters() {
    const dataInicio = document.getElementById('dataInicio').value;
    const dataFim = document.getElementById('dataFim').value;
    
    if (dataInicio && dataFim && new Date(dataInicio) > new Date(dataFim)) {
        showNotification('Data de início não pode ser maior que data de fim!', 'error');
        return false;
    }
    
    return true;
}

// ===== FUNÇÕES DE UTILITÁRIOS ADICIONAIS =====
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
}

function formatDateTime(dateTimeString) {
    const date = new Date(dateTimeString);
    return date.toLocaleString('pt-BR');
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Aplicar filtros com debounce para melhor performance
const debouncedApplyFilters = debounce(applyFilters, 300);

// ===== CONFIGURAÇÕES FINAIS =====
console.log('Sistema de Validação do Contador carregado com sucesso!');
console.log('Atalhos disponíveis:');
console.log('- Ctrl+A: Selecionar todos visíveis');
console.log('- Ctrl+F: Focar no campo de funcionário');
console.log('- Ctrl+R: Atualizar dados');
console.log('- ESC: Fechar modal');