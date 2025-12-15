// ===== VARIÁVEIS GLOBAIS =====
let selectedRows = new Set();
let currentPage = 1;
let pageSize = 50;
let totalRecords = 247;
let isUploading = false;
let isProcessing = false;

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', function() {
    createToastContainer(); 
    initializeXMLManagement();
    initializeEventListeners();
    initializeFilters();
    updateUI();
    initializeActionButtons();
    setupAdvancedFeatures();
    initializeBackButton(); 
});

function initializeXMLManagement() {
    initializeCNPJMask();
    initializeValueMasks();
    initializeUploadArea();
    updateSelectedCount();
    setupTableInteractions();
    loadUserPreferences();
}

function initializeEventListeners() {
    
    const selectAllCheckbox = document.getElementById('selectAllCheckbox');
    if (selectAllCheckbox) {
        selectAllCheckbox.addEventListener('change', toggleSelectAll);
    }
    
    const rowCheckboxes = document.querySelectorAll('.row-checkbox');
    rowCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', handleRowSelection);
    });
    
    const fileInput = document.getElementById('xmlFiles');
    if (fileInput) {
        fileInput.addEventListener('change', handleFileSelection);
    }
    
    const filterInputs = document.querySelectorAll('.filter-group input, .filter-group select');
    filterInputs.forEach(input => {
        input.addEventListener('input', debounce(handleFilterChange, 300));
    });
}

function initializeFilters() {
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    
    const dataInicioElement = document.getElementById('data-inicio');
    const dataFimElement = document.getElementById('data-fim');
    
    if (dataInicioElement) dataInicioElement.value = formatDate(firstDay);
    if (dataFimElement) dataFimElement.value = formatDate(today);
}

// ===== INICIALIZAÇÃO DOS BOTÕES DE AÇÃO =====
function initializeActionButtons() {
    const actionButtons = document.querySelectorAll('.btn-action');
    
    actionButtons.forEach(button => {
        button.addEventListener('mouseenter', handleButtonHover);
        button.addEventListener('mouseleave', handleButtonLeave);
        
        button.addEventListener('mousedown', handleButtonPress);
        button.addEventListener('mouseup', handleButtonRelease);
        
        button.addEventListener('keydown', handleButtonKeydown);
        
        addContextualIndicators(button);
    });
}

function handleButtonHover(event) {
    const button = event.currentTarget;
    const icon = button.querySelector('i');
    if (!icon) return;
    
    if (button.classList.contains('view')) {
        icon.style.transform = 'scale(1.1)';
    } else if (button.classList.contains('download')) {
        icon.style.transform = 'scale(1.1) translateY(-1px)';
    } else if (button.classList.contains('edit')) {
        icon.style.transform = 'scale(1.1) rotate(5deg)';
    } else if (button.classList.contains('delete')) {
        icon.style.transform = 'scale(1.1)';
        icon.style.animation = 'deleteShake 0.3s ease-in-out';
    } else if (button.classList.contains('retry')) {
        icon.style.transform = 'scale(1.1) rotate(180deg)';
    } else if (button.classList.contains('process')) {
        icon.style.animation = 'processRotate 1s linear infinite';
    } else if (button.classList.contains('report')) {
        icon.style.transform = 'scale(1.1)';
    } else if (button.classList.contains('track')) {
        icon.style.transform = 'scale(1.1)';
        icon.style.animation = 'trackMove 1s ease-in-out infinite alternate';
    } else if (button.classList.contains('error-log')) {
        icon.style.transform = 'scale(1.1)';
        icon.style.animation = 'errorPulse 0.8s ease-in-out infinite';
    } else if (button.classList.contains('priority')) {
        icon.style.transform = 'scale(1.1)';
        icon.style.animation = 'starTwinkle 1s ease-in-out infinite';
    }
}

function handleButtonLeave(event) {
    const button = event.currentTarget;
    const icon = button.querySelector('i');
    if (!icon) return;
    
    icon.style.transform = '';
    icon.style.animation = '';
}

function handleButtonPress(event) {
    const button = event.currentTarget;
    button.style.transform = 'scale(0.95)';
}

function handleButtonRelease(event) {
    const button = event.currentTarget;
    button.style.transform = '';
}

function handleButtonKeydown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        event.currentTarget.click();
    }
}

function addContextualIndicators(button) {
    const row = button.closest('tr');
    if (!row) return;
    
    const statusBadge = row.querySelector('.status-badge');
    const docType = row.querySelector('.doc-type');
    
    if (statusBadge && statusBadge.classList.contains('erro')) {
        if (button.classList.contains('retry')) {
            button.classList.add('highlighted');
        }
    }
    
    if (docType) {
        button.setAttribute('data-doc-type', docType.textContent.trim());
    }
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

// ===== CRIAR CONTAINER DE TOAST =====
function createToastContainer() {
    if (document.getElementById('toast-container')) return;
    
    const container = document.createElement('div');
    container.id = 'toast-container';
    container.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        gap: 10px;
        max-width: min(400px, calc(100vw - 40px));
    `;
    
    document.body.appendChild(container);
}

// ===== FUNÇÕES DE ANIMAÇÃO DOS BOTÕES =====
function animateButton(button, states = {}) {
    if (!button || button.classList.contains('is-animating')) return;
    
    const { loading = 'loading', success = 'success', duration = 1200, successDuration = 1500 } = states;
    
    button.classList.add('is-animating');
    
    button.classList.add(loading);
    
    setTimeout(() => {
        button.classList.remove(loading);
        button.classList.add(success);
        
        setTimeout(() => {
            button.classList.remove(success, 'is-animating');
        }, successDuration);
    }, duration);
}

function setButtonState(button, state, duration = 2000) {
    if (!button) return;
    
    button.classList.remove('loading', 'success', 'error', 'in-progress');
    
    button.classList.add(state);
    
    if (duration > 0) {
        setTimeout(() => {
            button.classList.remove(state);
        }, duration);
    }
}

function animateRowActions(rowId, animationType = 'success') {
    const row = document.querySelector(`input[data-id="${rowId}"]`).closest('tr');
    if (!row) return;
    
    const buttons = row.querySelectorAll('.btn-action');
    
    buttons.forEach((button, index) => {
        setTimeout(() => {
            setButtonState(button, animationType, 1000);
        }, index * 100);
    });
}

// ===== FUNÇÕES DE AÇÕES INDIVIDUAIS COM ANIMAÇÕES =====
function viewDetails(id) {
    const button = document.querySelector(`[onclick="viewDetails(${id})"]`);
    animateButton(button);
    
    showToast('info', 'Visualização', `Carregando detalhes completos do XML ${id}...`);
    
    setTimeout(() => {
        showToast('success', 'Visualização', `Detalhes do XML ${id} carregados com sucesso!`);
        openDetailsModal(id);
    }, 1200);
}

function downloadSingle(id) {
    const button = document.querySelector(`[onclick="downloadSingle(${id})"]`);
    animateButton(button);
    
    showToast('info', 'Download', `Preparando download do XML ${id}...`);
    
    setTimeout(() => {
        showToast('success', 'Download', `XML ${id} baixado com sucesso!`);
        simulateFileDownload(`XML_${id}.xml`);
    }, 1800);
}

function editXML(id) {
    const button = document.querySelector(`[onclick="editXML(${id})"]`);
    animateButton(button);
    
    showToast('info', 'Edição', `Abrindo editor para XML ${id}...`);
    
    setTimeout(() => {
        showToast('success', 'Edição', `Editor do XML ${id} carregado com sucesso!`);
        openEditModal(id);
    }, 1200);
}

function deleteXML(id) {
    if (confirm(`⚠️ Tem certeza que deseja excluir o XML ${id}? Esta ação não pode ser desfeita.`)) {
        const button = document.querySelector(`[onclick="deleteXML(${id})"]`);
        setButtonState(button, 'loading');
        
        showToast('warning', 'Exclusão', `Excluindo XML ${id}...`);
        
        setTimeout(() => {
            const row = document.querySelector(`input[data-id="${id}"]`).closest('tr');
            if (row) {
                row.style.animation = 'fadeOutRow 0.5s ease-out forwards';
                setTimeout(() => {
                    row.remove();
                    selectedRows.delete(id);
                    updateSelectedCount();
                    updateBatchButtons();
                    updateStatistics(-1);
                }, 500);
            }
            showToast('success', 'Exclusão', `XML ${id} excluído com sucesso!`);
        }, 1500);
    }
}

function retryProcess(id) {
    const button = document.querySelector(`[onclick="retryProcess(${id})"]`);
    animateButton(button, { duration: 2000, successDuration: 1000 });
    
    showToast('info', 'Reprocessamento', `Tentando reprocessar XML ${id}...`);
    
    setTimeout(() => {
        const statusCell = document.querySelector(`input[data-id="${id}"]`).closest('tr').querySelector('.status-badge');
        if (statusCell) {
            statusCell.className = 'status-badge processado';
            statusCell.innerHTML = '<i class="fas fa-check-circle"></i> Processado';
        }
        
        showToast('success', 'Reprocessamento', `XML ${id} reprocessado com sucesso!`);
        updateStatistics(0, -1, 1); 
    }, 2000);
}

function processXML(id) {
    const button = document.querySelector(`[onclick="processXML(${id})"]`);
    animateButton(button, { duration: 2500 });
    
    showToast('info', 'Processamento', `Processando XML ${id}...`);
    
    setTimeout(() => {
        const statusCell = document.querySelector(`input[data-id="${id}"]`).closest('tr').querySelector('.status-badge');
        if (statusCell) {
            statusCell.className = 'status-badge processado';
            statusCell.innerHTML = '<i class="fas fa-check-circle"></i> Processado';
        }
        
        showToast('success', 'Processamento', `XML ${id} processado com sucesso!`);
        updateStatistics(0, -1, 1); 
    }, 2500);
}

function generateReport(id) {
    const button = document.querySelector(`[onclick="generateReport(${id})"]`);
    animateButton(button, { duration: 2000 });
    
    showToast('info', 'Relatório', `Gerando relatório detalhado para XML ${id}...`);
    
    setTimeout(() => {
        showToast('success', 'Relatório', `Relatório do XML ${id} gerado com sucesso!`);
        simulateFileDownload(`Relatorio_XML_${id}.pdf`);
    }, 2000);
}

function trackXML(id) {
    const button = document.querySelector(`[onclick="trackXML(${id})"]`);
    animateButton(button, { duration: 1500 });
    
    showToast('info', 'Rastreamento', `Rastreando status do XML ${id}...`);
    
    setTimeout(() => {
        const statuses = [
            'Em trânsito para o destinatário',
            'Entregue ao destinatário',
            'Aguardando confirmação',
            'Processado com sucesso'
        ];
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
        showToast('success', 'Rastreamento', `XML ${id} - Status: ${randomStatus}`);
    }, 1500);
}

function viewErrorLog(id) {
    const button = document.querySelector(`[onclick="viewErrorLog(${id})"]`);
    animateButton(button, { duration: 1000 });
    
    showToast('info', 'Diagnóstico', `Analisando erros do XML ${id}...`);
    
    setTimeout(() => {
        const errors = [
            'Erro de validação de schema',
            'CNPJ inválido',
            'Data de emissão inconsistente',
            'Valor total incorreto',
            'Assinatura digital inválida',
            'Código de produto não encontrado'
        ];
        const randomErrors = errors.slice(0, Math.floor(Math.random() * 3) + 1);
        showToast('error', 'Diagnóstico', `XML ${id} - ${randomErrors.length} erro(s): ${randomErrors.join(', ')}`);
        openErrorModal(id, randomErrors);
    }, 1000);
}

function setPriority(id) {
    const button = document.querySelector(`[onclick="setPriority(${id})"]`);
    const priorities = [
        { icon: 'fas fa-exclamation-circle', name: 'Alta', color: '#E74C3C' },
        { icon: 'fas fa-minus-circle', name: 'Média', color: '#F39C12' },
        { icon: 'fas fa-check-circle', name: 'Baixa', color: '#27AE60' }
    ];
    const selectedPriority = priorities[Math.floor(Math.random() * 3)];
    
    animateButton(button, { duration: 1200, successDuration: 2000 });
    
    showToast('info', 'Prioridade', `Definindo prioridade para XML ${id}...`);
    
    setTimeout(() => {
        const icon = button.querySelector('i');
        if (icon) {
            const originalClass = icon.className;
            icon.className = selectedPriority.icon;
            icon.style.color = selectedPriority.color;
            
            setTimeout(() => {
                icon.className = originalClass;
                icon.style.color = '';
            }, 3000);
        }
        
        showToast('success', 'Prioridade', `XML ${id} - Prioridade: ${selectedPriority.name}`);
    }, 1200);
}

// ===== FUNÇÕES DE MODAL =====
function openDetailsModal(id) {
    console.log(`Abrindo modal de detalhes para XML ${id}`);
    showToast('info', 'Modal', `Modal de detalhes para XML ${id} seria aberto aqui`);
}

function openEditModal(id) {
    console.log(`Abrindo modal de edição para XML ${id}`);
    showToast('info', 'Modal', `Modal de edição para XML ${id} seria aberto aqui`);
}

function openErrorModal(id, errors) {
    console.log(`Abrindo modal de erros para XML ${id}:`, errors);
    showToast('info', 'Modal', `Modal de erros para XML ${id} seria aberto aqui`);
}

// ===== FUNÇÕES AUXILIARES =====
function simulateFileDownload(filename) {
    const link = document.createElement('a');
    link.href = '#';
    link.download = filename;
    link.style.display = 'none';
    document.body.appendChild(link);
    
    setTimeout(() => {
        document.body.removeChild(link);
    }, 100);
}

function updateStatistics(totalChange = 0, pendingChange = 0, processedChange = 0, errorChange = 0) {
    const totalElement = document.querySelector('.stat-card.total .stat-number');
    const pendingElement = document.querySelector('.stat-card.pending .stat-number');
    const processedElement = document.querySelector('.stat-card.processed .stat-number');
    const errorElement = document.querySelector('.stat-card.error .stat-number');
    
    if (totalElement && totalChange !== 0) {
        const currentValue = parseInt(totalElement.textContent) || 0;
        totalElement.textContent = currentValue + totalChange;
        animateStatChange(totalElement);
    }
    
    if (pendingElement && pendingChange !== 0) {
        const currentValue = parseInt(pendingElement.textContent) || 0;
        pendingElement.textContent = Math.max(0, currentValue + pendingChange);
        animateStatChange(pendingElement);
    }
    
    if (processedElement && processedChange !== 0) {
        const currentValue = parseInt(processedElement.textContent) || 0;
        processedElement.textContent = currentValue + processedChange;
        animateStatChange(processedElement);
    }
    
    if (errorElement && errorChange !== 0) {
        const currentValue = parseInt(errorElement.textContent) || 0;
        errorElement.textContent = Math.max(0, currentValue + errorChange);
        animateStatChange(errorElement);
    }
}

function animateStatChange(element) {
    if (!element) return;
    
    element.style.transform = 'scale(1.1)';
    element.style.color = '#27AE60';
    
    setTimeout(() => {
        element.style.transform = '';
        element.style.color = '';
    }, 600);
}

// ===== FUNÇÕES DE MÁSCARA =====
function initializeCNPJMask() {
    const cnpjInput = document.getElementById('cnpj-emitente');
    if (cnpjInput) {
        cnpjInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            value = value.replace(/(\d{2})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d)/, '$1/$2');
            value = value.replace(/(\d{4})(\d)/, '$1-$2');
            e.target.value = value;
        });
    }
}

function initializeValueMasks() {
    const valueInputs = document.querySelectorAll('#valor-min, #valor-max');
    valueInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            value = (value / 100).toFixed(2);
            value = 'R$ ' + value.replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
            e.target.value = value;
        });
    });
}

// ===== FUNÇÕES DE SELEÇÃO =====
function toggleSelectAll() {
    const selectAllCheckbox = document.getElementById('selectAllCheckbox');
    const rowCheckboxes = document.querySelectorAll('.row-checkbox');
    
    if (selectAllCheckbox && selectAllCheckbox.checked) {
        rowCheckboxes.forEach(checkbox => {
            checkbox.checked = true;
            selectedRows.add(checkbox.dataset.id);
        });
    } else {
        rowCheckboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
        selectedRows.clear();
    }
    
    updateSelectedCount();
    updateBatchButtons();
}

function selectAllVisible() {
    const rowCheckboxes = document.querySelectorAll('.row-checkbox:not(:checked)');
    rowCheckboxes.forEach(checkbox => {
        checkbox.checked = true;
        selectedRows.add(checkbox.dataset.id);
    });
    
    const selectAllCheckbox = document.getElementById('selectAllCheckbox');
    if (selectAllCheckbox) selectAllCheckbox.checked = true;
    updateSelectedCount();
    updateBatchButtons();
    
    showToast('success', 'Seleção', `${rowCheckboxes.length} itens selecionados`);
}

function deselectAll() {
    const rowCheckboxes = document.querySelectorAll('.row-checkbox');
    const count = selectedRows.size;
    
    rowCheckboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
    
    selectedRows.clear();
    const selectAllCheckbox = document.getElementById('selectAllCheckbox');
    if (selectAllCheckbox) selectAllCheckbox.checked = false;
    updateSelectedCount();
    updateBatchButtons();
    
    showToast('info', 'Seleção', `${count} itens desmarcados`);
}

function handleRowSelection(event) {
    const checkbox = event.target;
    const id = checkbox.dataset.id;
    
    if (checkbox.checked) {
        selectedRows.add(id);
    } else {
        selectedRows.delete(id);
        const selectAllCheckbox = document.getElementById('selectAllCheckbox');
        if (selectAllCheckbox) selectAllCheckbox.checked = false;
    }
    
    updateSelectedCount();
    updateBatchButtons();
}

function updateSelectedCount() {
    const count = selectedRows.size;
    const selectedCountElement = document.getElementById('selected-count');
    if (selectedCountElement) {
        selectedCountElement.textContent = `${count} selecionados`;
    }
}

function updateBatchButtons() {
    const count = selectedRows.size;
    const buttons = document.querySelectorAll('.btn-batch');
    
    buttons.forEach(button => {
        button.disabled = count === 0;
        
        const span = button.querySelector('span');
        if (!span) return;
        
        if (button.classList.contains('download')) {
            span.textContent = `Baixar Lote (${count})`;
        } else if (button.classList.contains('send')) {
            span.textContent = `Enviar para Domínio (${count})`;
        } else if (button.classList.contains('process')) {
            span.textContent = `Processar Lote (${count})`;
        } else if (button.classList.contains('delete')) {
            span.textContent = `Excluir Lote (${count})`;
        }
    });
}

// ===== FUNÇÕES DE FILTRO =====
function clearAllFilters() {
    const filterInputs = document.querySelectorAll('.filter-group input, .filter-group select');
    filterInputs.forEach(input => {
        if (input.type === 'date') {
            input.value = '';
        } else {
            input.value = '';
        }
    });
    
    showToast('success', 'Filtros', 'Todos os filtros foram limpos');
    applyFilters();
}

function applyFilters() {
    if (!validateFilters()) return;
    
    const filters = {
        dataInicio: document.getElementById('data-inicio')?.value || '',
        dataFim: document.getElementById('data-fim')?.value || '',
        tipoDocumento: document.getElementById('tipo-documento')?.value || '',
        cnpjEmitente: document.getElementById('cnpj-emitente')?.value || '',
        statusDocumento: document.getElementById('status-documento')?.value || '',
        numeroNf: document.getElementById('numero-nf')?.value || '',
        valorMin: document.getElementById('valor-min')?.value || '',
        valorMax: document.getElementById('valor-max')?.value || ''
    };
    
    localStorage.setItem('xmlFilters', JSON.stringify(filters));
    
    showToast('info', 'Filtros', 'Aplicando filtros...');
    
    setTimeout(() => {
        showToast('success', 'Filtros', 'Filtros aplicados com sucesso!');
        
        const activeFilters = Object.values(filters).filter(value => value !== '').length;
        if (activeFilters > 0) {
            const filterApplied = document.querySelector('.filter-applied');
            if (filterApplied) {
                filterApplied.textContent = `${activeFilters} filtro(s) ativo(s)`;
            }
        }
    }, 1000);
}

function handleFilterChange() {
}

function validateFilters() {
    const dataInicioElement = document.getElementById('data-inicio');
    const dataFimElement = document.getElementById('data-fim');
    
    if (dataInicioElement && dataFimElement) {
        const dataInicio = dataInicioElement.value;
        const dataFim = dataFimElement.value;
        
        if (dataInicio && dataFim && new Date(dataInicio) > new Date(dataFim)) {
            showToast('error', 'Erro de Validação', 'Data de início não pode ser maior que data de fim');
            return false;
        }
    }
    
    const valorMinElement = document.getElementById('valor-min');
    const valorMaxElement = document.getElementById('valor-max');
    
    if (valorMinElement && valorMaxElement) {
        const valorMin = valorMinElement.value;
        const valorMax = valorMaxElement.value;
        
        if (valorMin && valorMax) {
            const min = parseFloat(valorMin.replace(/[^\d,]/g, '').replace(',', '.'));
            const max = parseFloat(valorMax.replace(/[^\d,]/g, '').replace(',', '.'));
            
            if (min > max) {
                showToast('error', 'Erro de Validação', 'Valor mínimo não pode ser maior que valor máximo');
                return false;
            }
        }
    }
    
    return true;
}

// ===== FUNÇÕES DE AÇÕES EM LOTE =====
function downloadBatch() {
    const count = selectedRows.size;
    if (count === 0) return;
    
    if (isProcessing) {
        showToast('warning', 'Processamento', 'Aguarde o término da operação atual');
        return;
    }
    
    isProcessing = true;
    showToast('info', 'Download', `Iniciando download de ${count} XML(s)...`);
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 20;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            setTimeout(() => {
                isProcessing = false;
                showToast('success', 'Download', `Download de ${count} arquivo(s) concluído!`);
                simulateFileDownload(`XMLs_Lote_${Date.now()}.zip`);
            }, 500);
        }
    }, 300);
}

function sendToDomain() {
    const count = selectedRows.size;
    if (count === 0) return;
    
    if (isProcessing) {
        showToast('warning', 'Processamento', 'Aguarde o término da operação atual');
        return;
    }
    
    if (confirm(`Deseja enviar ${count} XML(s) para o domínio?`)) {
        isProcessing = true;
        showToast('info', 'Envio', `Enviando ${count} XML(s) para o domínio...`);
        
        setTimeout(() => {
            isProcessing = false;
            showToast('success', 'Envio', `${count} arquivo(s) enviado(s) com sucesso!`);
            
            selectedRows.forEach(id => {
                const statusCell = document.querySelector(`input[data-id="${id}"]`)?.closest('tr')?.querySelector('.status-badge');
                if (statusCell) {
                    statusCell.className = 'status-badge enviado';
                    statusCell.innerHTML = '<i class="fas fa-paper-plane"></i> Enviado';
                }
            });
            
            deselectAll();
        }, 3000);
    }
}

function processBatch() {
    const count = selectedRows.size;
    if (count === 0) return;
    
    if (isProcessing) {
        showToast('warning', 'Processamento', 'Aguarde o término da operação atual');
        return;
    }
    
    if (confirm(`Deseja processar ${count} XML(s)?`)) {
        isProcessing = true;
        showToast('info', 'Processamento', `Processando ${count} XML(s)...`);
        
        let processed = 0;
        const processInterval = setInterval(() => {
            processed++;
            
            if (processed <= count) {
                showToast('info', 'Processamento', `Processando item ${processed} de ${count}...`, 1000);
            }
            
            if (processed >= count) {
                clearInterval(processInterval);
                
                setTimeout(() => {
                    isProcessing = false;
                    showToast('success', 'Processamento', `${count} arquivo(s) processado(s) com sucesso!`);
                    
                    selectedRows.forEach(id => {
                        const statusCell = document.querySelector(`input[data-id="${id}"]`)?.closest('tr')?.querySelector('.status-badge');
                        if (statusCell) {
                            statusCell.className = 'status-badge processado';
                            statusCell.innerHTML = '<i class="fas fa-check-circle"></i> Processado';
                        }
                    });
                    
                    updateStatistics(0, -count, count);
                    deselectAll();
                }, 1000);
            }
        }, 800);
    }
}

function deleteBatch() {
    const count = selectedRows.size;
    if (count === 0) return;
    
    if (isProcessing) {
        showToast('warning', 'Processamento', 'Aguarde o término da operação atual');
        return;
    }
    
    if (confirm(`⚠️ ATENÇÃO: Deseja realmente excluir ${count} XML(s)? Esta ação não pode ser desfeita.`)) {
        isProcessing = true;
        showToast('warning', 'Exclusão', `Excluindo ${count} XML(s)...`);
        
        setTimeout(() => {
            const rowsToRemove = [];
            selectedRows.forEach(id => {
                const row = document.querySelector(`input[data-id="${id}"]`)?.closest('tr');
                if (row) {
                    rowsToRemove.push(row);
                }
            });
            
            rowsToRemove.forEach((row, index) => {
                setTimeout(() => {
                    row.style.animation = 'fadeOutRow 0.5s ease-out forwards';
                    setTimeout(() => {
                        row.remove();
                    }, 500);
                }, index * 100);
            });
            
            setTimeout(() => {
                isProcessing = false;
                updateStatistics(-count);
                selectedRows.clear();
                updateSelectedCount();
                updateBatchButtons();
                showToast('success', 'Exclusão', `${count} arquivo(s) excluído(s) com sucesso!`);
            }, (rowsToRemove.length * 100) + 1000);
        }, 2000);
    }
}

// ===== FUNÇÕES DE PAGINAÇÃO =====
function goToPage(action) {
    const totalPages = Math.ceil(totalRecords / pageSize);
    
    switch(action) {
        case 'first':
            currentPage = 1;
            break;
        case 'prev':
            if (currentPage > 1) currentPage--;
            break;
        case 'next':
            if (currentPage < totalPages) currentPage++;
            break;
        case 'last':
            currentPage = totalPages;
            break;
        default:
            if (typeof action === 'number') {
                currentPage = action;
            }
    }
    
    updatePagination();
    loadPageData();
}

function changePageSize() {
    const pageSizeElement = document.getElementById('page-size');
    if (pageSizeElement) {
        const newSize = parseInt(pageSizeElement.value);
        pageSize = newSize;
        currentPage = 1;
        updatePagination();
        loadPageData();
        saveUserPreferences();
    }
}

function updatePagination() {
    const totalPages = Math.ceil(totalRecords / pageSize);
    
    const firstBtn = document.querySelector('.btn-page[onclick*="first"]');
    const prevBtn = document.querySelector('.btn-page[onclick*="prev"]');
    const nextBtn = document.querySelector('.btn-page[onclick*="next"]');
    const lastBtn = document.querySelector('.btn-page[onclick*="last"]');
    
    if (firstBtn) firstBtn.disabled = currentPage === 1;
    if (prevBtn) prevBtn.disabled = currentPage === 1;
    if (nextBtn) nextBtn.disabled = currentPage === totalPages;
    if (lastBtn) lastBtn.disabled = currentPage === totalPages;
    
    const startRecord = (currentPage - 1) * pageSize + 1;
    const endRecord = Math.min(currentPage * pageSize, totalRecords);
    
    const paginationInfo = document.querySelector('.pagination-info span');
    if (paginationInfo) {
        paginationInfo.textContent = `Mostrando ${startRecord}-${endRecord} de ${totalRecords} registros`;
    }
    
    updatePageNumbers(totalPages);
}

function updatePageNumbers(totalPages) {
    const pageNumbersContainer = document.querySelector('.page-numbers');
    if (!pageNumbersContainer) return;
    
    pageNumbersContainer.innerHTML = '';
    
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage < maxVisiblePages - 1) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    if (startPage > 1) {
        const firstPageBtn = createPageButton(1);
        pageNumbersContainer.appendChild(firstPageBtn);
        
        if (startPage > 2) {
            const separator = document.createElement('span');
            separator.className = 'page-separator';
            separator.textContent = '...';
            pageNumbersContainer.appendChild(separator);
        }
    }
    
    for (let i = startPage; i <= endPage; i++) {
        const pageBtn = createPageButton(i);
        if (i === currentPage) {
            pageBtn.classList.add('active');
        }
        pageNumbersContainer.appendChild(pageBtn);
    }
    
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            const separator = document.createElement('span');
            separator.className = 'page-separator';
            separator.textContent = '...';
            pageNumbersContainer.appendChild(separator);
        }
        
        const lastPageBtn = createPageButton(totalPages);
        pageNumbersContainer.appendChild(lastPageBtn);
    }
}

function createPageButton(pageNumber) {
    const button = document.createElement('button');
    button.className = 'btn-page';
    button.textContent = pageNumber;
    button.onclick = () => goToPage(pageNumber);
    return button;
}

function loadPageData() {
    showToast('info', 'Carregamento', `Carregando página ${currentPage}...`, 2000);
    
    setTimeout(() => {
        showToast('success', 'Carregamento', 'Dados carregados com sucesso!', 2000);
        
        selectedRows.clear();
        updateSelectedCount();
        updateBatchButtons();
        
        const selectAllCheckbox = document.getElementById('selectAllCheckbox');
        if (selectAllCheckbox) {
            selectAllCheckbox.checked = false;
        }
    }, 1000);
}

// ===== FUNÇÕES DE UPLOAD =====
function initializeUploadArea() {
    const uploadArea = document.getElementById('uploadArea');
    if (!uploadArea) return;
    
    uploadArea.addEventListener('dragover', handleDragOver);
    uploadArea.addEventListener('dragleave', handleDragLeave);
    uploadArea.addEventListener('drop', handleDrop);
    
    uploadArea.addEventListener('click', () => {
        const xmlFilesInput = document.getElementById('xmlFiles');
        if (xmlFilesInput) xmlFilesInput.click();
    });
}

function openUploadModal() {
    const uploadModal = document.getElementById('upload-modal');
    if (uploadModal) {
        uploadModal.style.display = 'flex';
        resetUploadForm();
    }
}

function closeUploadModal() {
    if (isUploading) {
        if (confirm('Upload em andamento. Deseja realmente cancelar?')) {
            isUploading = false;
            const uploadModal = document.getElementById('upload-modal');
            if (uploadModal) uploadModal.style.display = 'none';
            resetUploadForm();
        }
    } else {
        const uploadModal = document.getElementById('upload-modal');
        if (uploadModal) uploadModal.style.display = 'none';
        resetUploadForm();
    }
}

function handleDragOver(e) {
    e.preventDefault();
    e.currentTarget.classList.add('dragover');
}

function handleDragLeave(e) {
    e.preventDefault();
    e.currentTarget.classList.remove('dragover');
}

function handleDrop(e) {
    e.preventDefault();
    e.currentTarget.classList.remove('dragover');
    
    const files = e.dataTransfer.files;
    handleFiles(files);
}

function handleFileSelection(e) {
    const files = e.target.files;
    handleFiles(files);
}

function handleFiles(files) {
    const xmlFiles = Array.from(files).filter(file => 
        file.name.toLowerCase().endsWith('.xml') || 
        file.type === 'text/xml' || 
        file.type === 'application/xml'
    );
    
    if (xmlFiles.length === 0) {
        showToast('error', 'Erro', 'Nenhum arquivo XML válido foi selecionado');
        return;
    }
    
    if (xmlFiles.length > 100) {
        showToast('error', 'Erro', 'Máximo de 100 arquivos permitidos por upload');
        return;
    }
    
    const oversizedFiles = xmlFiles.filter(file => file.size > 10 * 1024 * 1024); // 10MB
    if (oversizedFiles.length > 0) {
        showToast('error', 'Erro', `${oversizedFiles.length} arquivo(s) excedem o limite de 10MB`);
        return;
    }
    
    const totalSize = xmlFiles.reduce((sum, file) => sum + file.size, 0);
    const totalSizeMB = (totalSize / (1024 * 1024)).toFixed(2);
    
    if (totalSize > 100 * 1024 * 1024) { 
        showToast('error', 'Erro', `Tamanho total dos arquivos (${totalSizeMB}MB) excede o limite de 100MB`);
        return;
    }
    
    const uploadBtn = document.querySelector('.modal-footer .btn-primary');
    if (uploadBtn) {
        uploadBtn.disabled = false;
        const span = uploadBtn.querySelector('span');
        if (span) {
            span.textContent = `Enviar ${xmlFiles.length} Arquivo(s) (${totalSizeMB}MB)`;
        }
    }
    
    displayFileList(xmlFiles);
    
    showToast('success', 'Seleção', `${xmlFiles.length} arquivo(s) XML selecionado(s) - Total: ${totalSizeMB}MB`);
}

function displayFileList(files) {
    let fileListContainer = document.querySelector('.file-list');
    const uploadArea = document.querySelector('.upload-area');
    
    if (!fileListContainer && uploadArea) {
        fileListContainer = document.createElement('div');
        fileListContainer.className = 'file-list';
        uploadArea.appendChild(fileListContainer);
    }
    
    if (fileListContainer) {
        fileListContainer.innerHTML = '<h4>Arquivos Selecionados:</h4>';
        
        const fileList = document.createElement('ul');
        fileList.style.cssText = 'max-height: 150px; overflow-y: auto; margin: 10px 0; padding: 0; list-style: none;';
        
        files.forEach(file => {
            const listItem = document.createElement('li');
            listItem.style.cssText = 'padding: 5px; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; align-items: center;';
            
            const fileName = document.createElement('span');
            fileName.textContent = file.name;
            fileName.style.cssText = 'flex: 1; margin-right: 10px; font-size: 0.9rem;';
            
            const fileSize = document.createElement('span');
            fileSize.textContent = formatFileSize(file.size);
            fileSize.style.cssText = 'color: #666; font-size: 0.8rem;';
            
            listItem.appendChild(fileName);
            listItem.appendChild(fileSize);
            fileList.appendChild(listItem);
        });
        
        fileListContainer.appendChild(fileList);
    }
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function startUpload() {
    const fileInput = document.getElementById('xmlFiles');
    if (!fileInput || fileInput.files.length === 0) {
        showToast('error', 'Erro', 'Nenhum arquivo selecionado');
        return;
    }
    
    const files = fileInput.files;
    isUploading = true;
    
    const uploadProgress = document.getElementById('uploadProgress');
    if (uploadProgress) uploadProgress.style.display = 'block';
    
    const buttons = document.querySelectorAll('.modal-footer button');
    buttons.forEach(btn => btn.disabled = true);
    
    let progress = 0;
    let currentFile = 0;
    const totalFiles = files.length;
    
    const interval = setInterval(() => {
        progress += Math.random() * 8 + 2; 
        
        if (progress > 100) progress = 100;
        
        updateProgressBar(progress, currentFile, totalFiles);
        
        if (progress >= (currentFile + 1) * (100 / totalFiles) && currentFile < totalFiles - 1) {
            currentFile++;
        }
        
        if (progress >= 100) {
            clearInterval(interval);
            completeUpload(totalFiles);
        }
    }, 150);
}

function updateProgressBar(percent, currentFile, totalFiles) {
    const progressFill = document.querySelector('.progress-fill');
    const progressPercent = document.getElementById('progressPercent');
    const progressText = document.getElementById('progressText');
    
    if (progressFill) progressFill.style.width = `${percent}%`;
    if (progressPercent) progressPercent.textContent = `${Math.round(percent)}%`;
    
    if (percent < 100) {
        if (progressText) {
            progressText.textContent = `Enviando arquivo ${currentFile + 1} de ${totalFiles}...`;
        }
    } else {
        if (progressText) progressText.textContent = 'Processando arquivos no servidor...';
    }
}

function completeUpload(fileCount) {
    setTimeout(() => {
        isUploading = false;
        closeUploadModal();
        showToast('success', 'Upload', `${fileCount} arquivo(s) enviado(s) e processado(s) com sucesso!`);
        
        updateStatistics(fileCount, fileCount);
        refreshData();
    }, 1500);
}

function resetUploadForm() {
    const xmlFilesInput = document.getElementById('xmlFiles');
    const uploadProgress = document.getElementById('uploadProgress');
    
    if (xmlFilesInput) xmlFilesInput.value = '';
    if (uploadProgress) uploadProgress.style.display = 'none';
    
    const fileList = document.querySelector('.file-list');
    if (fileList) {
        fileList.remove();
    }
    
    const uploadBtn = document.querySelector('.modal-footer .btn-primary');
    if (uploadBtn) {
        uploadBtn.disabled = true;
        const span = uploadBtn.querySelector('span');
        if (span) span.textContent = 'Enviar Arquivos';
    }
    
    const buttons = document.querySelectorAll('.modal-footer button');
    buttons.forEach(btn => {
        if (!btn.classList.contains('btn-primary')) {
            btn.disabled = false;
        }
    });
    
    updateProgressBar(0, 0, 0);
}

// ===== FUNÇÕES AUXILIARES PRINCIPAIS =====
function goBack() {
    if (isUploading || isProcessing) {
        if (confirm('Operação em andamento. Deseja realmente sair?')) {
            isUploading = false;
            isProcessing = false;
            
            try {
                window.location.href = 'dashboard.html';
            } catch (error) {
                window.history.back();
            }
        }
    } else {
        try {
            window.location.href = 'dashboard.html';
        } catch (error) {
            window.history.back();
        }
    }
}

function syncXMLData() {
    if (isProcessing) {
        showToast('warning', 'Sincronização', 'Aguarde o término da operação atual');
        return;
    }
    
    isProcessing = true;
    showToast('info', 'Sincronização', 'Sincronizando dados com a Receita Federal...');
    
    const steps = [
        'Conectando com a Receita Federal...',
        'Verificando novos documentos...',
        'Baixando XMLs pendentes...',
        'Validando documentos...',
        'Atualizando base de dados...'
    ];
    
    let currentStep = 0;
    const stepInterval = setInterval(() => {
        if (currentStep < steps.length) {
            showToast('info', 'Sincronização', steps[currentStep], 1500);
            currentStep++;
        } else {
            clearInterval(stepInterval);
            
            setTimeout(() => {
                isProcessing = false;
                showToast('success', 'Sincronização', 'Sincronização concluída com sucesso!');
                
                const newRecords = Math.floor(Math.random() * 10) + 1;
                updateStatistics(newRecords, newRecords);
                refreshData();
            }, 1000);
        }
    }, 1200);
}

function exportData() {
    if (isProcessing) {
        showToast('warning', 'Exportação', 'Aguarde o término da operação atual');
        return;
    }
    
    isProcessing = true;
    showToast('info', 'Exportação', 'Preparando exportação dos dados...');
    
    setTimeout(() => {
        isProcessing = false;
        showToast('success', 'Exportação', 'Arquivo Excel exportado com sucesso!');
        simulateFileDownload(`Relatorio_XMLs_${formatDate(new Date()).replace(/-/g, '')}.xlsx`);
    }, 2500);
}

function refreshData() {
    if (isProcessing) {
        showToast('warning', 'Atualização', 'Aguarde o término da operação atual');
        return;
    }
    
    showToast('info', 'Atualização', 'Atualizando dados...');
    
    setTimeout(() => {
        const syncLast = document.querySelector('.sync-last');
        if (syncLast) {
            const now = new Date();
            syncLast.textContent = `Última sincronização: ${now.toLocaleDateString('pt-BR')} às ${now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;
        }
        
        const syncNext = document.querySelector('.sync-next');
        if (syncNext) {
            const nextSync = new Date(Date.now() + 60 * 60 * 1000); 
            syncNext.textContent = `Próxima sincronização: ${nextSync.toLocaleDateString('pt-BR')} às ${nextSync.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;
        }
        
        showToast('success', 'Atualização', 'Dados atualizados com sucesso!');
    }, 2000);
}

function updateUI() {
    updatePagination();
    updateBatchButtons();
    updateSelectedCount();
}

function setupTableInteractions() {
    setupColumnSorting();
    
    setupAdvancedSearch();
    
    setupStatusFilter();
}

// ===== FUNCIONALIDADES AVANÇADAS =====
function setupAdvancedFeatures() {
    setupAdvancedSearch();
    setupColumnSorting();
    setupStatusFilter();
    setupAutoSaveFilters();
    loadFiltersState();
    updateRealTimeStats();
    setupKeyboardShortcuts();
}

function setupAdvancedSearch() {
    const searchInput = document.getElementById('numero-nf');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const tableRows = document.querySelectorAll('.xml-table tbody tr');
            let visibleCount = 0;
            
            tableRows.forEach(row => {
                const cells = row.querySelectorAll('td');
                const rowText = Array.from(cells).map(cell => cell.textContent.toLowerCase()).join(' ');
                
                if (rowText.includes(searchTerm) || searchTerm === '') {
                    row.style.display = '';
                    visibleCount++;
                } else {
                    row.style.display = 'none';
                }
            });
            
            if (searchTerm) {
                showToast('info', 'Busca', `${visibleCount} registro(s) encontrado(s)`, 2000);
            }
        }, 300));
    }
}

function setupColumnSorting() {
    const headers = document.querySelectorAll('.xml-table th');
    headers.forEach((header, index) => {
        if (index === 0 || index === headers.length - 1) return; 
        
        header.style.cursor = 'pointer';
        header.title = 'Clique para ordenar';
        
        const sortIcon = document.createElement('i');
        sortIcon.className = 'fas fa-sort';
        sortIcon.style.marginLeft = '5px';
        sortIcon.style.opacity = '0.5';
        header.appendChild(sortIcon);
        
        header.addEventListener('click', () => sortTable(index, header));
    });
}

function sortTable(columnIndex, headerElement) {
    const table = document.querySelector('.xml-table');
    const tbody = table?.querySelector('tbody');
    if (!tbody) return;
    
    const rows = Array.from(tbody.querySelectorAll('tr'));
    
    const currentOrder = headerElement.dataset.sortOrder || 'none';
    const isAscending = currentOrder !== 'asc';
    
    document.querySelectorAll('.xml-table th i').forEach(icon => {
        if (icon.classList.contains('fa-sort') || icon.classList.contains('fa-sort-up') || icon.classList.contains('fa-sort-down')) {
            icon.className = 'fas fa-sort';
            icon.style.opacity = '0.5';
        }
    });
    
    const sortIcon = headerElement.querySelector('i');
    if (sortIcon) {
        sortIcon.className = isAscending ? 'fas fa-sort-up' : 'fas fa-sort-down';
        sortIcon.style.opacity = '1';
    }
    
    headerElement.dataset.sortOrder = isAscending ? 'asc' : 'desc';
    
    rows.sort((a, b) => {
        const aText = a.cells[columnIndex]?.textContent?.trim() || '';
        const bText = b.cells[columnIndex]?.textContent?.trim() || '';
        
        const aNum = parseFloat(aText.replace(/[^\d,-]/g, '').replace(',', '.'));
        const bNum = parseFloat(bText.replace(/[^\d,-]/g, '').replace(',', '.'));
        
        if (!isNaN(aNum) && !isNaN(bNum)) {
            return isAscending ? aNum - bNum : bNum - aNum;
        }
        
        if (aText.match(/\d{2}\/\d{2}\/\d{4}/)) {
            const aDate = new Date(aText.split('/').reverse().join('-'));
            const bDate = new Date(bText.split('/').reverse().join('-'));
            return isAscending ? aDate - bDate : bDate - aDate;
        }
        
        return isAscending ? aText.localeCompare(bText) : bText.localeCompare(aText);
    });
    
    rows.forEach(row => tbody.appendChild(row));
    
    showToast('info', 'Ordenação', `Tabela ordenada por ${headerElement.textContent.replace(/[↑↓]/g, '').trim()}`, 2000);
}

function setupStatusFilter() {
    const statusFilter = document.getElementById('status-documento');
    if (statusFilter) {
        statusFilter.addEventListener('change', function() {
            const selectedStatus = this.value;
            const tableRows = document.querySelectorAll('.xml-table tbody tr');
            let visibleCount = 0;
            
            tableRows.forEach(row => {
                const statusCell = row.querySelector('.status-badge');
                if (!selectedStatus || (statusCell && statusCell.className.includes(selectedStatus))) {
                    row.style.display = '';
                    visibleCount++;
                } else {
                    row.style.display = 'none';
                }
            });
            
            if (selectedStatus) {
                showToast('info', 'Filtro', `${visibleCount} registro(s) com status "${this.options[this.selectedIndex].text}"`, 2000);
            }
        });
    }
}

function setupAutoSaveFilters() {
    const filterInputs = document.querySelectorAll('.filter-group input, .filter-group select');
    filterInputs.forEach(input => {
        input.addEventListener('change', saveFiltersState);
    });
}

function saveFiltersState() {
    const filters = {
        dataInicio: document.getElementById('data-inicio')?.value || '',
        dataFim: document.getElementById('data-fim')?.value || '',
        tipoDocumento: document.getElementById('tipo-documento')?.value || '',
        cnpjEmitente: document.getElementById('cnpj-emitente')?.value || '',
        statusDocumento: document.getElementById('status-documento')?.value || '',
        numeroNf: document.getElementById('numero-nf')?.value || '',
        valorMin: document.getElementById('valor-min')?.value || '',
        valorMax: document.getElementById('valor-max')?.value || ''
    };
    
    localStorage.setItem('xmlFilters', JSON.stringify(filters));
}

function loadFiltersState() {
    const savedFilters = localStorage.getItem('xmlFilters');
    if (savedFilters) {
        try {
            const filters = JSON.parse(savedFilters);
            
            Object.keys(filters).forEach(key => {
                const elementId = key.replace(/([A-Z])/g, '-$1').toLowerCase();
                const element = document.getElementById(elementId);
                if (element && filters[key]) {
                    element.value = filters[key];
                }
            });
        } catch (error) {
            console.warn('Erro ao carregar filtros salvos:', error);
        }
    }
}

function updateRealTimeStats() {
    setInterval(() => {
        const pendingElement = document.querySelector('.stat-card.pending .stat-number');
        const processedElement = document.querySelector('.stat-card.processed .stat-number');
        
        if (pendingElement && processedElement && Math.random() > 0.8) { 
            const currentPending = parseInt(pendingElement.textContent) || 0;
            const currentProcessed = parseInt(processedElement.textContent) || 0;
            
            if (currentPending > 0) {
                pendingElement.textContent = currentPending - 1;
                processedElement.textContent = currentProcessed + 1;
                
                animateStatChange(pendingElement);
                animateStatChange(processedElement);
                
                showToast('info', 'Atualização', 'Documento processado automaticamente', 3000);
            }
        }
    }, 15000); 
}

function setupKeyboardShortcuts() {
}

// ===== PREFERÊNCIAS DO USUÁRIO =====
function saveUserPreferences() {
    const preferences = {
        pageSize: pageSize,
        theme: document.body.getAttribute('data-theme') || 'light',
        autoRefresh: true,
        notifications: true,
        lastPage: currentPage
    };
    
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
}

function loadUserPreferences() {
    const savedPreferences = localStorage.getItem('userPreferences');
    if (savedPreferences) {
        try {
            const preferences = JSON.parse(savedPreferences);
            
            if (preferences.pageSize) {
                pageSize = preferences.pageSize;
                const pageSizeSelect = document.getElementById('page-size');
                if (pageSizeSelect) {
                    pageSizeSelect.value = preferences.pageSize;
                }
            }
            
            if (preferences.theme && preferences.theme !== 'light') {
                document.body.setAttribute('data-theme', preferences.theme);
            }
        } catch (error) {
            console.warn('Erro ao carregar preferências:', error);
        }
    }
}

// ===== SISTEMA DE TOAST =====
function showToast(type, title, message, duration = 4000) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icons = {
        success: '<i class="fas fa-check-circle"></i>',
        error: '<i class="fas fa-times-circle"></i>',
        info: '<i class="fas fa-info-circle"></i>',
        warning: '<i class="fas fa-exclamation-triangle"></i>'
    };
    
    toast.innerHTML = `
        <div class="toast-icon">${icons[type]}</div>
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
        </div>
        <button class="toast-close" onclick="removeToast(this)">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    toast.style.cssText = `
        display: flex;
        align-items: center;
        padding: 12px 16px;
        margin-bottom: 8px;
        border-radius: 6px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        background: white;
        border-left: 4px solid;
        min-width: 300px;
        max-width: 400px;
        pointer-events: auto;
        animation: slideInRight 0.3s ease-out;
        position: relative;
    `;
    
    const colors = {
        success: '#27AE60',
        error: '#E74C3C',
        info: '#3498DB',
        warning: '#F39C12'
    };
    
    toast.style.borderLeftColor = colors[type];
    
    container.appendChild(toast);
    
    const timeoutId = setTimeout(() => {
        removeToast(toast.querySelector('.toast-close'));
    }, duration);
    
    toast.dataset.timeoutId = timeoutId;
    
    const toasts = container.querySelectorAll('.toast');
    if (toasts.length > 5) {
        removeToast(toasts[0].querySelector('.toast-close'));
    }
}

function removeToast(button) {
    const toast = button.closest('.toast');
    if (toast) {
        if (toast.dataset.timeoutId) {
            clearTimeout(parseInt(toast.dataset.timeoutId));
        }
        
        toast.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.remove();
            }
        }, 300);
    }
}

// ===== FUNÇÕES UTILITÁRIAS =====
function formatDate(date) {
    return date.toISOString().split('T')[0];
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

function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}

function formatDateTime(dateString) {
    const date = new Date(dateString);
    return {
        date: date.toLocaleDateString('pt-BR'),
        time: date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };
}

// ===== EVENTOS GLOBAIS =====
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey || e.metaKey) {
        const firstSelected = document.querySelector('.row-checkbox:checked');
        
        switch(e.key) {
            case 'f':
                e.preventDefault();
                const searchInput = document.getElementById('numero-nf');
                if (searchInput) {
                    searchInput.focus();
                    showToast('info', 'Atalho', 'Foco na busca (Ctrl+F)', 2000);
                }
                break;
            case 'a':
                e.preventDefault();
                selectAllVisible();
                break;
            case 'u':
                e.preventDefault();
                openUploadModal();
                break;
            case 'r':
                e.preventDefault();
                refreshData();
                break;
            case 's':
                e.preventDefault();
                syncXMLData();
                break;
            case 'e':
                e.preventDefault();
                exportData();
                break;
        }
        
        if (firstSelected) {
            const id = firstSelected.dataset.id;
            
            switch(e.key) {
                case 'v':
                    e.preventDefault();
                    viewDetails(id);
                    break;
                case 'd':
                    e.preventDefault();
                    downloadSingle(id);
                    break;
                case 'p':
                    e.preventDefault();
                    processXML(id);
                    break;
                case 'Delete':
                    e.preventDefault();
                    deleteXML(id);
                    break;
            }
        }
    }
    
    if (e.key === 'Escape') {
        closeUploadModal();
    }
    
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        const focusedElement = document.activeElement;
        if (focusedElement && focusedElement.classList.contains('row-checkbox')) {
            e.preventDefault();
            const allCheckboxes = Array.from(document.querySelectorAll('.row-checkbox'));
            const currentIndex = allCheckboxes.indexOf(focusedElement);
            
            if (e.key === 'ArrowUp' && currentIndex > 0) {
                allCheckboxes[currentIndex - 1].focus();
            } else if (e.key === 'ArrowDown' && currentIndex < allCheckboxes.length - 1) {
                allCheckboxes[currentIndex + 1].focus();
            }
        }
    }
    
    if (e.key === ' ') {
        const focusedElement = document.activeElement;
        if (focusedElement && focusedElement.classList.contains('row-checkbox')) {
            e.preventDefault();
            focusedElement.click();
        }
    }
});

window.addEventListener('beforeunload', function(e) {
    if (isUploading || isProcessing) {
        e.preventDefault();
        e.returnValue = 'Operação em andamento. Deseja realmente sair?';
        return e.returnValue;
    }
    
    saveUserPreferences();
});

window.addEventListener('unload', function() {
    saveUserPreferences();
    saveFiltersState();
});

document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        console.log('Página oculta - pausando atualizações em tempo real');
    } else {
        console.log('Página visível - retomando atualizações');
        refreshData();
    }
});

window.addEventListener('online', function() {
    showToast('success', 'Conectividade', 'Conexão restaurada', 3000);
});

window.addEventListener('offline', function() {
    showToast('warning', 'Conectividade', 'Conexão perdida - algumas funcionalidades podem não funcionar', 5000);
});

// ===== INTEGRAÇÃO COM BACKEND =====

async function loadXMLData(page = 1, filters = {}) {
    try {
        const params = new URLSearchParams({
            page: page,
            pageSize: pageSize,
            ...filters
        });
    
        const data = {
            records: [], 
            totalRecords: 247,
            currentPage: page,
            totalPages: Math.ceil(247 / pageSize)
        };
        
        return data;
    } catch (error) {
        showToast('error', 'Erro', 'Falha ao carregar dados do servidor');
        console.error('Erro ao carregar dados:', error);
    }
}

async function uploadXMLFiles(files) {
    try {
        const formData = new FormData();
        Array.from(files).forEach(file => {
            formData.append('xmlFiles', file);
        });
        
      
        return { success: true, uploadedCount: files.length };
    } catch (error) {
        showToast('error', 'Erro', 'Falha no upload dos arquivos');
        console.error('Erro no upload:', error);
    }
}

// ===== ANIMAÇÕES CSS ADICIONAIS =====
const additionalAnimations = `
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
    
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes fadeOutRow {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(-100px);
        }
    }
    
    @keyframes deleteShake {
        0%, 100% { transform: scale(1.1) rotate(0deg); }
        25% { transform: scale(1.1) rotate(-2deg); }
        75% { transform: scale(1.1) rotate(2deg); }
    }
    
    @keyframes processRotate {
        from { transform: scale(1.1) rotate(0deg); }
        to { transform: scale(1.1) rotate(360deg); }
    }
    
    @keyframes trackMove {
        from { transform: scale(1.1) translateX(-1px); }
        to { transform: scale(1.1) translateX(1px); }
    }
    
    @keyframes errorPulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.7; }
    }
    
    @keyframes starTwinkle {
        0%, 100% { transform: scale(1.1); }
        50% { transform: scale(1.2); }
    }
    
    .toast {
        animation: slideInRight 0.3s ease-out;
    }
    
    .xml-table tr {
        transition: background-color 0.2s ease;
    }
    
    .stat-card {
        transition: all 0.3s ease;
    }
    
    .btn-batch:disabled {
        transition: all 0.3s ease;
    }
    
    .progress-fill {
        transition: width 0.3s ease;
    }
    
    .upload-area.dragover {
        animation: pulse 0.5s ease-in-out;
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.02); }
        100% { transform: scale(1); }
    }
`;

if (!document.querySelector('#additionalAnimationsStyle')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'additionalAnimationsStyle';
    styleSheet.textContent = additionalAnimations;
    document.head.appendChild(styleSheet);
}

// ===== INICIALIZAÇÃO FINAL =====
console.log(' Sistema XML de Entrada inicializado com ícones profissionais!');
console.log(' Atalhos disponíveis:');
console.log('  Ctrl+F: Buscar');
console.log('  Ctrl+A: Selecionar todos');
console.log('  Ctrl+U: Upload');
console.log('  Ctrl+R: Atualizar');
console.log('  Ctrl+S: Sincronizar');
console.log('  Ctrl+E: Exportar');
console.log('  Ctrl+V: Visualizar (item selecionado)');
console.log('  Ctrl+D: Download (item selecionado)');
console.log('  Ctrl+P: Processar (item selecionado)');
console.log('  Delete: Excluir (item selecionado)');
console.log('  Setas: Navegar na tabela');
console.log('  Espaço: Selecionar/deselecionar item');
console.log('  ESC: Fechar modais');