// ===== VARIÁVEIS GLOBAIS =====
let selectedRows = new Set();
let currentPage = 1;
let pageSize = 50;
let totalRecords = 156;
let isProcessing = false;
let selectedDocType = null;

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', function() {
    initializeXMLSaidaManagement();
    initializeEventListeners();
    initializeFilters();
    updateUI();
    initializeActionButtons();
    setupAdvancedFeatures();
});

function initializeXMLSaidaManagement() {
    initializeCNPJMask();
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
    
    const filterInputs = document.querySelectorAll('.filter-group input, .filter-group select');
    filterInputs.forEach(input => {
        input.addEventListener('input', debounce(handleFilterChange, 300));
    });
    
    setupGenerateModal();
}

function initializeFilters() {
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    
    document.getElementById('data-inicio').value = formatDate(firstDay);
    document.getElementById('data-fim').value = formatDate(today);
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
    
    if (button.classList.contains('view')) {
        icon.style.transform = 'scale(1.1)';
    } else if (button.classList.contains('download')) {
        icon.style.transform = 'scale(1.1) translateY(-1px)';
    } else if (button.classList.contains('validate')) {
        icon.style.transform = 'scale(1.1)';
    } else if (button.classList.contains('send')) {
        icon.style.transform = 'scale(1.1)';
    } else if (button.classList.contains('track')) {
        icon.style.transform = 'scale(1.1)';
    } else if (button.classList.contains('retry')) {
        icon.style.transform = 'scale(1.1) rotate(180deg)';
    }
}

function handleButtonLeave(event) {
    const button = event.currentTarget;
    const icon = button.querySelector('i');
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
    
    if (statusBadge && statusBadge.classList.contains('pendente')) {
        if (button.classList.contains('validate')) {
            button.classList.add('highlighted');
        }
    }
    
    if (docType) {
        button.setAttribute('data-doc-type', docType.textContent.trim());
    }
}

// ===== FUNÇÕES DE AÇÕES INDIVIDUAIS =====
function viewDetails(id) {
    const button = document.querySelector(`[onclick="viewDetails(${id})"]`);
    animateButton(button);
    
    showToast('info', 'Visualização', `Carregando detalhes do XML ${id}...`);
    
    setTimeout(() => {
        showToast('success', 'Visualização', `Detalhes do XML ${id} carregados com sucesso!`);
    }, 1200);
}

function downloadSingle(id) {
    const button = document.querySelector(`[onclick="downloadSingle(${id})"]`);
    animateButton(button);
    
    showToast('info', 'Download', `Preparando download do XML ${id}...`);
    
    setTimeout(() => {
        showToast('success', 'Download', `XML ${id} baixado com sucesso!`);
        simulateFileDownload(`XML_Saida_${id}.xml`);
    }, 1800);
}

function validateXML(id) {
    const button = document.querySelector(`[onclick="validateXML(${id})"]`);
    animateButton(button, { duration: 2000 });
    
    showToast('info', 'Validação', `Validando XML ${id}...`);
    
    setTimeout(() => {
        
        const statusCell = document.querySelector(`input[data-id="${id}"]`).closest('tr').querySelector('.status-badge');
        if (statusCell) {
            statusCell.className = 'status-badge validado';
            statusCell.innerHTML = '<i class="fas fa-check-circle"></i> Validado';
        }
        
        showToast('success', 'Validação', `XML ${id} validado com sucesso!`);
        updateStatistics(0, -1, 1); 
    }, 2000);
}

function sendXML(id) {
    const button = document.querySelector(`[onclick="sendXML(${id})"]`);
    animateButton(button, { duration: 2500 });
    
    showToast('info', 'Envio', `Enviando XML ${id} para o domínio...`);
    
    setTimeout(() => {
        const statusCell = document.querySelector(`input[data-id="${id}"]`).closest('tr').querySelector('.status-badge');
        if (statusCell) {
            statusCell.className = 'status-badge enviado';
            statusCell.innerHTML = '<i class="fas fa-paper-plane"></i> Enviado';
        }
        
        showToast('success', 'Envio', `XML ${id} enviado com sucesso!`);
        updateStatistics(0, 0, -1, 1); 
    }, 2500);
}

function trackXML(id) {
    const button = document.querySelector(`[onclick="trackXML(${id})"]`);
    animateButton(button, { duration: 1500 });
    
    showToast('info', 'Rastreamento', `Rastreando XML ${id}...`);
    
    setTimeout(() => {
        const statuses = [
            'Documento recebido pelo destinatário',
            'Em processamento no sistema',
            'Validado com sucesso',
            'Integrado ao sistema contábil'
        ];
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
        showToast('success', 'Rastreamento', `XML ${id} - Status: ${randomStatus}`);
    }, 1500);
}

function retryValidation(id) {
    const button = document.querySelector(`[onclick="retryValidation(${id})"]`);
    animateButton(button, { duration: 2000 });
    
    showToast('info', 'Revalidação', `Tentando validar novamente XML ${id}...`);
    
    setTimeout(() => {
        const statusCell = document.querySelector(`input[data-id="${id}"]`).closest('tr').querySelector('.status-badge');
        if (statusCell) {
            statusCell.className = 'status-badge validado';
            statusCell.innerHTML = '<i class="fas fa-check-circle"></i> Validado';
        }
        
        showToast('success', 'Revalidação', `XML ${id} validado com sucesso após correção!`);
        updateStatistics(0, 0, 1, -1); 
    }, 2000);
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

// ===== FUNÇÕES DE SELEÇÃO =====
function toggleSelectAll() {
    const selectAllCheckbox = document.getElementById('selectAllCheckbox');
    const rowCheckboxes = document.querySelectorAll('.row-checkbox');
    
    if (selectAllCheckbox.checked) {
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
    
    document.getElementById('selectAllCheckbox').checked = true;
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
    document.getElementById('selectAllCheckbox').checked = false;
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
        document.getElementById('selectAllCheckbox').checked = false;
    }
    
    updateSelectedCount();
    updateBatchButtons();
}

function updateSelectedCount() {
    const count = selectedRows.size;
    document.getElementById('selected-count').textContent = `${count} selecionados`;
}

function updateBatchButtons() {
    const count = selectedRows.size;
    const buttons = document.querySelectorAll('.btn-batch');
    
    buttons.forEach(button => {
        button.disabled = count === 0;
        
        if (button.classList.contains('download')) {
            button.querySelector('span').textContent = `Baixar Lote (${count})`;
        } else if (button.classList.contains('validate')) {
            button.querySelector('span').textContent = `Validar Selecionados (${count})`;
        } else if (button.classList.contains('send')) {
            button.querySelector('span').textContent = `Enviar para Domínio (${count})`;
        } else if (button.classList.contains('delete')) {
            button.querySelector('span').textContent = `Excluir Lote (${count})`;
        }
    });
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
    
    setTimeout(() => {
        isProcessing = false;
        showToast('success', 'Download', `Download de ${count} arquivo(s) concluído!`);
        simulateFileDownload(`XMLs_Saida_Lote_${Date.now()}.zip`);
    }, 2000);
}

function validateBatch() {
    const count = selectedRows.size;
    if (count === 0) return;
    
    if (isProcessing) {
        showToast('warning', 'Processamento', 'Aguarde o término da operação atual');
        return;
    }
    
    if (confirm(`Deseja validar ${count} XML(s)?`)) {
        isProcessing = true;
        showToast('info', 'Validação', `Validando ${count} XML(s)...`);
        
        setTimeout(() => {
            isProcessing = false;
            showToast('success', 'Validação', `${count} arquivo(s) validado(s) com sucesso!`);
            
            selectedRows.forEach(id => {
                const statusCell = document.querySelector(`input[data-id="${id}"]`).closest('tr').querySelector('.status-badge');
                if (statusCell && statusCell.classList.contains('pendente')) {
                    statusCell.className = 'status-badge validado';
                    statusCell.innerHTML = '<i class="fas fa-check-circle"></i> Validado';
                }
            });
            
            updateStatistics(0, -count, count);
            deselectAll();
        }, 3000);
    }
}

function sendToDomain() {
    const count = selectedRows.size;
    if (count === 0) return;
    
    if (isProcessing) {
        showToast('warning',
                    'Processamento', 'Aguarde o término da operação atual');
        return;
    }
    
    if (confirm(`Deseja enviar ${count} XML(s) para o domínio?`)) {
        isProcessing = true;
        showToast('info', 'Envio', `Enviando ${count} XML(s) para o domínio...`);
        
        setTimeout(() => {
            isProcessing = false;
            showToast('success', 'Envio', `${count} arquivo(s) enviado(s) com sucesso!`);
            
            selectedRows.forEach(id => {
                const statusCell = document.querySelector(`input[data-id="${id}"]`).closest('tr').querySelector('.status-badge');
                if (statusCell && statusCell.classList.contains('validado')) {
                    statusCell.className = 'status-badge enviado';
                    statusCell.innerHTML = '<i class="fas fa-paper-plane"></i> Enviado';
                }
            });
            
            updateStatistics(0, 0, -count, count);
            deselectAll();
        }, 3500);
    }
}

function deleteBatch() {
    const count = selectedRows.size;
    if (count === 0) return;
    
    if (isProcessing) {
        showToast('warning', 'Processamento', 'Aguarde o término da operação atual');
        return;
    }
    
    if (confirm(` ATENÇÃO: Deseja realmente excluir ${count} XML(s)? Esta ação não pode ser desfeita.`)) {
        isProcessing = true;
        showToast('warning', 'Exclusão', `Excluindo ${count} XML(s)...`);
        
        setTimeout(() => {
            const rowsToRemove = [];
            selectedRows.forEach(id => {
                const row = document.querySelector(`input[data-id="${id}"]`).closest('tr');
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
        dataInicio: document.getElementById('data-inicio').value,
        dataFim: document.getElementById('data-fim').value,
        tipoDocumento: document.getElementById('tipo-documento').value,
        cnpjDestinatario: document.getElementById('cnpj-destinatario').value,
        statusDocumento: document.getElementById('status-documento').value,
        numeroNf: document.getElementById('numero-nf').value
    };
    
    localStorage.setItem('xmlSaidaFilters', JSON.stringify(filters));
    
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
    const dataInicio = document.getElementById('data-inicio').value;
    const dataFim = document.getElementById('data-fim').value;
    
    if (dataInicio && dataFim && new Date(dataInicio) > new Date(dataFim)) {
        showToast('error', 'Erro de Validação', 'Data de início não pode ser maior que data de fim');
        return false;
    }
    
    return true;
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
    const newSize = parseInt(document.getElementById('page-size').value);
    pageSize = newSize;
    currentPage = 1;
    updatePagination();
    loadPageData();
    saveUserPreferences();
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

// ===== MODAL DE GERAÇÃO =====
function setupGenerateModal() {
    const docTypeOptions = document.querySelectorAll('.doc-type-option');
    docTypeOptions.forEach(option => {
        option.addEventListener('click', function() {
            docTypeOptions.forEach(opt => opt.classList.remove('selected'));
            
            this.classList.add('selected');
            selectedDocType = this.dataset.type;
            
            const continueBtn = document.querySelector('.modal-footer .btn-primary');
            if (continueBtn) {
                continueBtn.disabled = false;
            }
        });
    });
}

function openGenerateModal() {
    document.getElementById('generate-modal').style.display = 'flex';
    resetGenerateForm();
}

function closeGenerateModal() {
    document.getElementById('generate-modal').style.display = 'none';
    resetGenerateForm();
}

function resetGenerateForm() {
    const docTypeOptions = document.querySelectorAll('.doc-type-option');
    docTypeOptions.forEach(option => {
        option.classList.remove('selected');
    });
    
    selectedDocType = null;
    
    const continueBtn = document.querySelector('.modal-footer .btn-primary');
    if (continueBtn) {
        continueBtn.disabled = true;
    }
}

function startGeneration() {
    if (!selectedDocType) {
        showToast('error', 'Erro', 'Selecione um tipo de documento');
        return;
    }
    
    closeGenerateModal();
    
    const docTypeNames = {
        nfe: 'NFe - Nota Fiscal Eletrônica',
        nfce: 'NFCe - Nota Fiscal de Consumidor',
        cte: 'CTe - Conhecimento de Transporte',
        nfse: 'NFSe - Nota Fiscal de Serviços'
    };
    
    showToast('info', 'Geração', `Iniciando geração de ${docTypeNames[selectedDocType]}...`);
    
    setTimeout(() => {
        showToast('success', 'Geração', `${docTypeNames[selectedDocType]} gerado com sucesso!`);
        
        updateStatistics(1, 1);
        refreshData();
    }, 2500);
}

// ===== FUNÇÕES AUXILIARES =====
function goBack() {
    if (isProcessing) {
        if (confirm('Operação em andamento. Deseja realmente sair?')) {
            window.location.href = 'dashboard.html';
        }
    } else {
        window.location.href = 'dashboard.html';
    }
}

function syncXMLData() {
    if (isProcessing) {
        showToast('warning', 'Sincronização', 'Aguarde o término da operação atual');
        return;
    }
    
    isProcessing = true;
    showToast('info', 'Sincronização', 'Sincronizando dados de saída...');
    
    const steps = [
        'Verificando novos documentos...',
        'Validando XMLs pendentes...',
        'Atualizando status de envio...',
        'Sincronizando com sistemas externos...',
        'Finalizando sincronização...'
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
                
                const newRecords = Math.floor(Math.random() * 5) + 1;
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
    showToast('info', 'Exportação', 'Preparando exportação dos dados de saída...');
    
    setTimeout(() => {
        isProcessing = false;
        showToast('success', 'Exportação', 'Arquivo Excel exportado com sucesso!');
        simulateFileDownload(`Relatorio_XMLs_Saida_${formatDate(new Date()).replace(/-/g, '')}.xlsx`);
    }, 2500);
}

function refreshData() {
    if (isProcessing) {
        showToast('warning', 'Atualização', 'Aguarde o término da operação atual');
        return;
    }
    
    showToast('info', 'Atualização', 'Atualizando dados de saída...');
    
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

function updateStatistics(totalChange = 0, pendingChange = 0, validatedChange = 0, sentChange = 0) {
    const totalElement = document.querySelector('.stat-card.total .stat-number');
    const pendingElement = document.querySelector('.stat-card.pending .stat-number');
    const validatedElement = document.querySelector('.stat-card.validated .stat-number');
    const sentElement = document.querySelector('.stat-card.sent .stat-number');
    
    if (totalElement && totalChange !== 0) {
        const currentValue = parseInt(totalElement.textContent);
        totalElement.textContent = currentValue + totalChange;
        animateStatChange(totalElement);
    }
    
    if (pendingElement && pendingChange !== 0) {
        const currentValue = parseInt(pendingElement.textContent);
        pendingElement.textContent = Math.max(0, currentValue + pendingChange);
        animateStatChange(pendingElement);
    }
    
    if (validatedElement && validatedChange !== 0) {
        const currentValue = parseInt(validatedElement.textContent);
        validatedElement.textContent = Math.max(0, currentValue + validatedChange);
        animateStatChange(validatedElement);
    }
    
    if (sentElement && sentChange !== 0) {
        const currentValue = parseInt(sentElement.textContent);
        sentElement.textContent = currentValue + sentChange;
        animateStatChange(sentElement);
    }
}

function animateStatChange(element) {
    element.style.transform = 'scale(1.1)';
    element.style.color = '#27AE60';
    
    setTimeout(() => {
        element.style.transform = '';
        element.style.color = '';
    }, 600);
}

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

// ===== FUNÇÕES DE MÁSCARA =====
function initializeCNPJMask() {
    const cnpjInput = document.getElementById('cnpj-destinatario');
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
    const tbody = table.querySelector('tbody');
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
        const aText = a.cells[columnIndex].textContent.trim();
        const bText = b.cells[columnIndex].textContent.trim();
        
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
                if (!selectedStatus || statusCell.className.includes(selectedStatus)) {
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
        dataInicio: document.getElementById('data-inicio').value,
        dataFim: document.getElementById('data-fim').value,
        tipoDocumento: document.getElementById('tipo-documento').value,
        cnpjDestinatario: document.getElementById('cnpj-destinatario').value,
        statusDocumento: document.getElementById('status-documento').value,
        numeroNf: document.getElementById('numero-nf').value
    };
    
    localStorage.setItem('xmlSaidaFilters', JSON.stringify(filters));
}

function loadFiltersState() {
    const savedFilters = localStorage.getItem('xmlSaidaFilters');
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
        const validatedElement = document.querySelector('.stat-card.validated .stat-number');
        
        if (Math.random() > 0.8) {
            const currentPending = parseInt(pendingElement.textContent);
            const currentValidated = parseInt(validatedElement.textContent);
            
            if (currentPending > 0) {
                pendingElement.textContent = currentPending - 1;
                validatedElement.textContent = currentValidated + 1;
                
                animateStatChange(pendingElement);
                animateStatChange(validatedElement);
                
                showToast('info', 'Atualização', 'XML validado automaticamente', 3000);
            }
        }
    }, 20000);
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
    
    localStorage.setItem('xmlSaidaPreferences', JSON.stringify(preferences));
}

function loadUserPreferences() {
    const savedPreferences = localStorage.getItem('xmlSaidaPreferences');
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
                document.getElementById('numero-nf').focus();
                showToast('info', 'Atalho', 'Foco na busca (Ctrl+F)', 2000);
                break;
            case 'a':
                e.preventDefault();
                selectAllVisible();
                break;
            case 'g':
                e.preventDefault();
                openGenerateModal();
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
                case 'w':
                    e.preventDefault();
                    validateXML(id);
                    break;
                case 'p':
                    e.preventDefault();
                    sendXML(id);
                    break;
                case 'Delete':
                    e.preventDefault();
                    deleteBatch();
                    break;
            }
        }
    }
    
    if (e.key === 'Escape') {
        closeGenerateModal();
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
    if (isProcessing) {
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

console.log(' Sistema XML de Saída inicializado com sucesso!');
console.log(' Atalhos disponíveis:');
console.log('  Ctrl+F: Buscar');
console.log('  Ctrl+A: Selecionar todos');
console.log('  Ctrl+G: Gerar XML');
console.log('  Ctrl+R: Atualizar');
console.log('  Ctrl+S: Sincronizar');
console.log('  Ctrl+E: Exportar');
console.log('  Ctrl+V: Visualizar (item selecionado)');
console.log('  Ctrl+D: Download (item selecionado)');
console.log('  Ctrl+W: Validar (item selecionado)');
console.log('  Ctrl+P: Enviar (item selecionado)');
console.log('  Delete: Excluir selecionados');
console.log('  Setas: Navegar na tabela');
console.log('  Espaço: Selecionar/deselecionar item');
console.log('  ESC: Fechar modais');