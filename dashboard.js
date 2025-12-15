// ===== ELEMENTOS DO DOM =====
const navItems = document.querySelectorAll('.nav-item');
const contentSections = document.querySelectorAll('.content-section');
const companyButton = document.getElementById('companyButton');
const companyMenu = document.getElementById('companyMenu');
const companyOptions = document.querySelectorAll('.company-option');
const modalContainer = document.getElementById('modal-container');
const modalContainerSolicitacoes = document.getElementById('modal-container-solicitacoes');
const modalContainerFiscal = document.getElementById('modal-container-fiscal');

// ===== NAVEGAÇÃO ENTRE SEÇÕES =====
navItems.forEach(item => {
    item.addEventListener('click', () => {
        const section = item.dataset.section;
        
        // Remover classe active de todos os itens
        navItems.forEach(nav => nav.classList.remove('active'));
        contentSections.forEach(content => content.classList.remove('active'));
        
        // Adicionar classe active ao item clicado
        item.classList.add('active');
        document.getElementById(`${section}-section`).classList.add('active');
    });
});

// ===== DROPDOWN DE EMPRESAS =====
if (companyButton) {
    companyButton.addEventListener('click', (e) => {
        e.stopPropagation();
        companyButton.classList.toggle('active');
        if (companyMenu) {
            companyMenu.classList.toggle('show');
        }
    });
}

// Fechar dropdown ao clicar fora
document.addEventListener('click', () => {
    if (companyButton) {
        companyButton.classList.remove('active');
    }
    if (companyMenu) {
        companyMenu.classList.remove('show');
    }
});

// Seleção de empresa
if (companyOptions && companyOptions.length > 0) {
    companyOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // Remover active de todas as opções
            companyOptions.forEach(opt => opt.classList.remove('active'));
            
            // Adicionar active à opção selecionada
            option.classList.add('active');
            
            // Atualizar texto do botão
            const companyName = option.querySelector('span').textContent;
            const companyNameElement = document.querySelector('.company-name');
            if (companyNameElement) {
                companyNameElement.textContent = companyName;
            }
            
            // Fechar dropdown
            if (companyButton) {
                companyButton.classList.remove('active');
            }
            if (companyMenu) {
                companyMenu.classList.remove('show');
            }
            
            // Simular carregamento de dados da empresa
            showCompanyChangeMessage(companyName);
        });
    });
}

// ===== CONFIGURAÇÃO DOS EVENT LISTENERS =====

/**
 * Configura event listeners da seção RH
 */
function setupRHEventListeners() {
    const rhSection = document.getElementById('rh-section');
    if (rhSection) {
        const rhOptions = rhSection.querySelectorAll('.rh-option');
        
        console.log('Configurando', rhOptions.length, 'opções de RH');
        
        rhOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const feature = option.dataset.feature;
                const optionText = option.querySelector('span').textContent.trim();
                
                console.log('Clique em RH:', feature);
                
                switch(feature) {
                    case 'dados-pessoais':
                        openEmployeeDataForm();
                        break;
                    case 'dependentes':
                        openDependentsForm();
                        break;
                    case 'contratacao':
                        openContractForm();
                        break;
                    case 'beneficios':
                        openBenefitsForm();
                        break;

                    case 'validacao-contador':
                        redirectToValidacaoContador();
                        break;

                    default:
                        showFeatureMessage(optionText, feature);
                }
            });
        });
    } else {
        console.warn('Seção RH não encontrada');
    }
}

/**
 * Configura event listeners da seção Solicitações
 */
function setupSolicitacoesEventListeners() {
    const solicitacoesSection = document.getElementById('solicitacoes-section');
    
    if (solicitacoesSection) {
        const solicitacoesOptions = solicitacoesSection.querySelectorAll('.rh-option');
        
        console.log('Configurando', solicitacoesOptions.length, 'opções de solicitações');
        
        solicitacoesOptions.forEach(option => {
            option.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const feature = this.dataset.feature;
                const optionText = this.querySelector('span').textContent.trim();
                
                console.log('Clique em solicitação:', feature);
                
                switch(feature) {
                    case 'ferias':
                        openFeriasForm();
                        break;
                    case 'rescisao':
                        openRescisaoForm();
                        break;
                    case 'experiencia':
                        openExperienciaForm();
                        break;
                    case 'valores-beneficios':
                        openValoresBeneficiosForm();
                        break;
                    case 'folha-pagamento':
                        openFolhaPagamentoForm();
                        break;
                    case 'detalhes-rescisao':
                        openDetalhesRescisaoForm();
                        break;
                    case 'alocacoes':
                        openAlocacoesForm();
                        break;
                    case 'alocacao-funcionarios':
                        openAlocacaoFuncionariosForm();
                        break;
                    default:
                        showFeatureMessage(optionText, feature);
                }
            });
        });
    } else {
        console.error('Seção de solicitações não encontrada!');
    }
}

/**
 * Configura event listeners da seção Fiscal
 */
function setupFiscalEventListeners() {
    const fiscalSection = document.getElementById('fiscal-section');
    if (fiscalSection) {
        const fiscalOptions = fiscalSection.querySelectorAll('.rh-option');
        
        console.log('Configurando', fiscalOptions.length, 'opções fiscais');
        
        fiscalOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const feature = option.dataset.feature;
                const optionText = option.querySelector('span').textContent.trim();
                
                console.log('Clique em fiscal:', feature);
                
                switch(feature) {
                    case 'xml-entrada':
                        redirectToXMLEntrada();
                        break;
                    case 'xml-saida':
                        redirectToXMLSaida();
                        break;
                    default:
                        showFeatureMessage(optionText, feature);
                }
            });
        });
    } else {
        console.warn('Seção Fiscal não encontrada');
    }
}

/**
 * Configura todos os event listeners - PRINCIPAL
 */
function setupAllEventListeners() {
    console.log('Iniciando configuração de todos os event listeners...');
    
    setupRHEventListeners();
    setupSolicitacoesEventListeners();
    setupFiscalEventListeners();
    
    console.log('Todos os event listeners configurados!');
}

/**
 * Redireciona para a página dedicada de XML de Entrada
 */
function redirectToXMLEntrada() {
    const currentContext = {
        page: 'dashboard',
        section: 'fiscal',
        company: document.querySelector('.company-name')?.textContent || 'Empresa não selecionada',
        timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('dashboardContext', JSON.stringify(currentContext));
    
    // Criar overlay de loading imediatamente
    const loadingOverlay = document.createElement('div');
    loadingOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #1B365D 0%, #2E5984 100%);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        color: white;
        animation: fadeIn 0.3s ease-out;
    `;
    
    loadingOverlay.innerHTML = `
        <div style="text-align: center;">
            <div style="
                width: 60px;
                height: 60px;
                border: 4px solid rgba(212, 175, 55, 0.3);
                border-top: 4px solid #D4AF37;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 0 auto 1.5rem auto;
            "></div>
            <h2 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 0.5rem;">
                 Carregando XML de Entrada...
            </h2>
            <p style="opacity: 0.8;">Preparando ambiente de upload</p>
        </div>
    `;
    
    document.body.appendChild(loadingOverlay);
    
    
    setTimeout(() => {
        window.location.href = 'xmlentrada.html';
    }, 1200);
}

/**
 * Redireciona para a página dedicada de XML de Saída
 */
function redirectToXMLSaida() {
    const currentContext = {
        page: 'dashboard',
        section: 'fiscal',
        company: document.querySelector('.company-name')?.textContent || 'Empresa não selecionada',
        timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('dashboardContext', JSON.stringify(currentContext));
    
    // Criar overlay de loading imediatamente
    const loadingOverlay = document.createElement('div');
    loadingOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #1B365D 0%, #2E5984 100%);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        color: white;
        animation: fadeIn 0.3s ease-out;
    `;
    
    loadingOverlay.innerHTML = `
        <div style="text-align: center;">
            <div style="
                width: 60px;
                height: 60px;
                border: 4px solid rgba(212, 175, 55, 0.3);
                border-top: 4px solid #D4AF37;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 0 auto 1.5rem auto;
            "></div>
            <h2 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 0.5rem;">
                 Carregando XML de Saída...
            </h2>
            <p style="opacity: 0.8;">Preparando ambiente de upload</p>
        </div>
    `;
    
    // Adicionar ao body imediatamente
    document.body.appendChild(loadingOverlay);
    
    // Aguardar um pouco para o usuário ver a mensagem
    setTimeout(() => {
        window.location.href = 'xmlsaida.html';
    }, 1200);
}


/**
 * Função para mostrar mensagem de loading com callback
 */
function showLoadingMessage(message, callback) {
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'loading-message-overlay';
    
    loadingDiv.innerHTML = `
        <div class="loading-message-content">
            <div class="loading-message-inner">
                <div class="loading-message-spinner"></div>
                <div class="loading-message-text">${message}</div>
            </div>
        </div>
    `;
    
    document.body.appendChild(loadingDiv);
    
    setTimeout(() => {
        if (callback) callback();
    }, 1500);
}


// ===== FUNÇÕES DE MENSAGEM =====

/**
 * Mostra mensagem de funcionalidade em desenvolvimento
 */
function showFeatureMessage(title, feature) {
    const targetContainer = modalContainerSolicitacoes || modalContainer || modalContainerFiscal;
    
    if (!targetContainer) {
        console.error('Nenhum container de modal encontrado!');
        return;
    }
    
    const messageHTML = `
        <div class="modal-overlay" onclick="closeModal()">
            <div class="modal-content feature-message" onclick="event.stopPropagation()">
                <div class="modal-header">
                    <h2>${title}</h2>
                    <button class="close-btn" onclick="closeModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div class="feature-message-content">
                    <div class="feature-icon">
                        <i class="fas fa-cogs"></i>
                    </div>
                    <h3>Funcionalidade em Desenvolvimento</h3>
                    <p>Esta funcionalidade está sendo desenvolvida e estará disponível em breve.</p>
                    <div class="feature-info">
                        <p><strong>Funcionalidade:</strong> ${title}</p>
                        <p><strong>Status:</strong> <span class="status-badge developing">Em Desenvolvimento</span></p>
                        <p><strong>Previsão:</strong> Próxima atualização</p>
                    </div>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn-primary" onclick="closeModal()">
                        <i class="fas fa-check"></i> Entendido
                    </button>
                </div>
            </div>
        </div>
    `;
    
    targetContainer.innerHTML = messageHTML;
}

/**
 * Mostra mensagem de mudança de empresa
 */
function showCompanyChangeMessage(companyName) {
    if (typeof showToast === 'function') {
        showToast('info', 'Empresa Alterada', `Dados carregados para: ${companyName}`);
    } else {
        console.log(`Empresa alterada para: ${companyName}`);
    }
}

// ===== SISTEMA DE TOASTS =====

function showToast(type, title, message) {
    if (!type || !title || !message) {
        console.warn('Parâmetros inválidos para showToast:', { type, title, message });
        return;
    }
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let icon;
    switch(type) {
        case 'success':
            icon = 'fas fa-check-circle';
            break;
        case 'error':
            icon = 'fas fa-exclamation-circle';
            break;
        case 'warning':
            icon = 'fas fa-exclamation-triangle';
            break;
        case 'info':
            icon = 'fas fa-info-circle';
            break;
        default:
            icon = 'fas fa-bell';
    }
    
    toast.innerHTML = `
        <div class="toast-content">
            <i class="${icon}"></i>
            <div class="toast-text">
                <strong>${title}</strong>
                <p>${message}</p>
            </div>
            <button class="toast-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        border-left: 4px solid ${getToastColor(type)};
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        min-width: 300px;
        max-width: 400px;
    `;
    
    if (document.body) {
        document.body.appendChild(toast);
        
        setTimeout(() => {
            if (toast.parentElement) {
                toast.remove();
            }
        }, 5000);
    }
}

function getToastColor(type) {
    switch(type) {
        case 'success': return '#27AE60';
        case 'error': return '#E74C3C';
        case 'warning': return '#F39C12';
        case 'info': return '#3498DB';
        default: return '#95A5A6';
    }
}

// ===== FUNÇÕES DE FECHAMENTO =====

function closeModal() {
    if (modalContainer) {
        modalContainer.innerHTML = '';
    }
    if (modalContainerSolicitacoes) {
        modalContainerSolicitacoes.innerHTML = '';
    }
    if (modalContainerFiscal) {
        modalContainerFiscal.innerHTML = '';
    }
}

// ===== FUNÇÃO DE LOGOUT =====

function logout() {
    if (confirm('Tem certeza que deseja sair?')) {
        try {
            localStorage.removeItem('userData');
            localStorage.removeItem('dashboardContext');
            
            const exitOverlay = document.createElement('div');
            exitOverlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, #1B365D 0%, #2E5984 100%);
                z-index: 9999;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                color: white;
                animation: fadeIn 0.5s ease-out;
            `;
            
            exitOverlay.innerHTML = `
                <div style="text-align: center;">
                    <div style="
                        width: 60px;
                        height: 60px;
                        border: 4px solid rgba(212, 175, 55, 0.3);
                        border-top: 4px solid #D4AF37;
                        border-radius: 50%;
                        animation: spin 1s linear infinite;
                        margin: 0 auto 1.5rem auto;
                    "></div>
                    <h2 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 0.5rem;">
                        Encerrando Sessão
                    </h2>
                    <p style="opacity: 0.8;">Até logo!</p>
                </div>
            `;
            
            if (document.body) {
                document.body.appendChild(exitOverlay);
            }
            
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        } catch (error) {
            console.error('Erro durante logout:', error);
            window.location.href = 'index.html';
        }
    }
}

// ===== ADICIONAR ANIMAÇÕES CSS =====

function addAnimationStyles() {
    if (document.getElementById('dashboard-animations')) {
        return;
    }
    
    const animations = `
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
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        
        .toast-content {
            display: flex;
            align-items: flex-start;
            gap: 1rem;
            padding: 1rem;
        }
        
        .toast-content i {
            font-size: 1.2rem;
            margin-top: 0.2rem;
        }
        
        .toast-text {
            flex: 1;
        }
        
        .toast-text strong {
            display: block;
            margin-bottom: 0.25rem;
            color: #2C3E50;
        }
        
        .toast-text p {
            margin: 0;
            color: #7F8C8D;
            font-size: 0.9rem;
        }
        
        .toast-close {
            background: none;
            border: none;
            color: #7F8C8D;
            cursor: pointer;
            padding: 0.25rem;
            border-radius: 4px;
            transition: all 0.2s ease;
        }
        
        .toast-close:hover {
            background: rgba(127, 140, 141, 0.1);
            color: #2C3E50;
        }
    `;

    const style = document.createElement('style');
    style.id = 'dashboard-animations';
    style.textContent = animations;
    
    if (document.head) {
        document.head.appendChild(style);
    }
}

// ===== INICIALIZAÇÃO =====

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM carregado, iniciando configurações...');
    
  
    setupAllEventListeners();
    
    addAnimationStyles();
    
    const userData = localStorage.getItem('userData');
    
    if (userData) {
        const user = JSON.parse(userData);
        console.log('Usuário logado:', user.email);
        console.log('Login realizado em:', user.loginTime);
    } else {
        console.warn('Dados do usuário não encontrados, redirecionando para login');
        window.location.href = 'index.html';
        return;
    }
    
    // Verificar contexto salvo
    const savedContext = localStorage.getItem('dashboardContext');
    if (savedContext) {
        try {
            const context = JSON.parse(savedContext);
            console.log('Contexto restaurado:', context);
            
            // Restaurar empresa selecionada
            if (context.company) {
                const companyOptions = document.querySelectorAll('.company-option');
                companyOptions.forEach(option => {
                    const spanElement = option.querySelector('span');
                    if (spanElement && spanElement.textContent === context.company) {
                        option.click();
                    }
                });
            }
            
            // Restaurar seção ativa
            if (context.section && context.section !== 'dashboard') {
                const navItem = document.querySelector(`[data-section="${context.section}"]`);
                if (navItem) {
                    navItem.click();
                }
            }
        } catch (error) {
            console.error('Erro ao restaurar contexto:', error);
            localStorage.removeItem('dashboardContext');
        }
    }
});

// ===== FORMULÁRIOS DA SEÇÃO RH =====

/**
 * Abre o formulário de dados pessoais do funcionário
 */
function openEmployeeDataForm() {
    console.log('Abrindo formulário de dados pessoais');
    
    const targetContainer = document.getElementById('modal-container') || 
                           document.getElementById('modal-container-solicitacoes') ||
                           modalContainer;
    
    if (!targetContainer) {
        console.error('Container de modal não encontrado!');
        if (typeof showToast === 'function') {
            showToast('error', 'Erro', 'Erro ao abrir formulário. Tente novamente.');
        }
        return;
    }
    
    const formHTML = `
        <div class="modal-overlay" id="employeeModalOverlay">
            <div class="modal-content employee-data-form" onclick="event.stopPropagation()">
                <div class="modal-header">
                    <h2><i class="fas fa-id-card"></i> Dados Pessoais do Funcionário</h2>
                    <button class="close-btn" id="employeeCloseBtn">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div class="auto-save-indicator">
                    <i class="fas fa-save"></i>
                    <span> Dados salvos automaticamente</span>
                    <div class="save-status" id="saveStatus">
                        <i class="fas fa-check-circle"></i>
                        <span>Salvo</span>
                    </div>
                </div>

                <form class="employee-data-form-content" id="employeeDataForm">
                    <div class="form-grid">
                        <div class="form-group full-width">
                            <label for="nome-completo">Nome Completo </label>
                            <input type="text" id="nome-completo" name="nomeCompleto" required>
                        </div>
                        
                        <div class="form-group full-width">
                            <label for="nome-mae">Nome da Mãe </label>
                            <input type="text" id="nome-mae" name="nomeMae" required>
                        </div>
                        
                        <div class="form-group full-width">
                            <label for="nome-pai">Nome do Pai </label>
                            <input type="text" id="nome-pai" name="nomePai" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="rg">RG </label>
                            <input type="text" id="rg" name="rg" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="data-emissao-rg">Data Emissão RG </label>
                            <input type="date" id="data-emissao-rg" name="dataEmissaoRg" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="orgao-expedidor">Órgão Expedidor </label>
                            <input type="text" id="orgao-expedidor" name="orgaoExpedidor" placeholder="Ex: SSP/SP" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="cpf">CPF </label>
                            <input type="text" id="cpf" name="cpf" placeholder="000.000.000-00" class="cpf-mask" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="pis-pasep">PIS/PASEP </label>
                            <input type="text" id="pis-pasep" name="pisPasep" placeholder="000.00000.00-0" class="pis-mask" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="raca-etnia">Raça/Etnia </label>
                            <select id="raca-etnia" name="racaEtnia" required>
                                <option value="">Selecione...</option>
                                <option value="branca">Branca</option>
                                <option value="preta">Preta</option>
                                <option value="parda">Parda</option>
                                <option value="amarela">Amarela</option>
                                <option value="indigena">Indígena</option>
                                <option value="nao-declarado">Não declarado</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="titulo-eleitor">Título de Eleitor </label>
                            <input type="text" id="titulo-eleitor" name="tituloEleitor" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="certificado-reservista">Certificado de Reservista</label>
                            <input type="text" id="certificado-reservista" name="certificadoReservista" placeholder="Se aplicável">
                        </div>
                        
                        <div class="form-group full-width">
                            <label for="endereco-completo">Endereço Completo </label>
                            <textarea id="endereco-completo" name="enderecoCompleto" rows="3" 
                                placeholder="Rua, número, complemento, bairro, cidade, estado, CEP" required></textarea>
                        </div>
                    </div>
                </form>

                <div class="modal-footer">
                    <button type="button" class="btn-secondary" id="employeeCancelBtn">
                        <i class="fas fa-times"></i> Cancelar
                    </button>
                    <button type="button" class="btn-primary" id="employeeSaveBtn">
                        <i class="fas fa-save"></i> Salvar Rascunho
                    </button>
                    <button type="button" class="btn-success" id="employeeSubmitBtn">
                        <i class="fas fa-paper-plane"></i> Enviar
                    </button>
                </div>
            </div>
        </div>
    `;
    
    targetContainer.innerHTML = formHTML;
    
    
   
    setTimeout(() => {
      
        const closeBtn = document.getElementById('employeeCloseBtn');
        if (closeBtn) {
            closeBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Botão X clicado');
                closeEmployeeModal();
            });
        }
        
        
        const cancelBtn = document.getElementById('employeeCancelBtn');
        if (cancelBtn) {
            cancelBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Botão Cancelar clicado');
                closeEmployeeModal();
            });
        }
        
   
        const saveBtn = document.getElementById('employeeSaveBtn');
        if (saveBtn) {
            saveBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Botão Salvar clicado');
                saveEmployeeDraft();
            });
        }
        
      
        const submitBtn = document.getElementById('employeeSubmitBtn');
        if (submitBtn) {
            submitBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Botão Enviar clicado');
                submitEmployeeData();
            });
        }
        
       
        const overlay = document.getElementById('employeeModalOverlay');
        if (overlay) {
            overlay.addEventListener('click', function(e) {
                if (e.target === overlay) {
                    console.log('Overlay clicado');
                    closeEmployeeModal();
                }
            });
        }
        
    }, 100); 
    
   
    if (typeof initializeEmployeeForm === 'function') {
        initializeEmployeeForm();
    }
    
    if (typeof startAutoSave === 'function') {
        startAutoSave();
    }
}

// ===== FUNÇÃO ESPECÍFICA PARA FECHAR ESTE MODAL =====
function closeEmployeeModal() {
    console.log('Fechando modal de funcionário...');
    
    const containers = [
        document.getElementById('modal-container'),
        document.getElementById('modal-container-solicitacoes'),
        document.getElementById('modal-container-fiscal')
    ];
    
    containers.forEach(container => {
        if (container) {
            container.innerHTML = '';
        }
    });
    
   
    const overlay = document.getElementById('employeeModalOverlay');
    if (overlay && overlay.parentElement) {
        overlay.parentElement.removeChild(overlay);
    }
    
    console.log('Modal de funcionário fechado');
}

// ===== FUNÇÕES AUXILIARES =====
function saveEmployeeDraft() {
    console.log('Salvando rascunho...');
    if (typeof showToast === 'function') {
        showToast('success', 'Rascunho', 'Dados salvos como rascunho!');
    }
}

function submitEmployeeData() {
    console.log('Enviando dados...');
    if (typeof showToast === 'function') {
        showToast('success', 'Sucesso', 'Dados enviados com sucesso!');
    }
    setTimeout(() => {
        closeEmployeeModal();
    }, 1500);
}


if (typeof closeModal === 'undefined') {
    function closeModal() {
        closeEmployeeModal();
    }
}


/**
 * Abre o formulário de dependentes do funcionário
 */
function openDependentsForm() {
    console.log('Abrindo formulário de dependentes');
    
    const targetContainer = modalContainer;
    
    if (!targetContainer) {
        console.error('Container de modal não encontrado!');
        showToast('error', 'Erro', 'Erro ao abrir formulário. Tente novamente.');
        return;
    }
    
    const formHTML = `
        <div class="modal-overlay" onclick="closeModal()">
            <div class="modal-content dependents-form" onclick="event.stopPropagation()">
                <div class="modal-header">
                    <h2><i class="fas fa-users"></i> Informações sobre Dependentes</h2>
                    <button class="close-btn" onclick="closeModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div class="auto-save-indicator">
                    <i class="fas fa-save"></i>
                    <span> Dados salvos automaticamente</span>
                    <div class="save-status" id="saveStatus">
                        <i class="fas fa-check-circle"></i>
                        <span>Salvo</span>
                    </div>
                </div>

                <div class="form-description">
                    <p><i class="fas fa-info-circle"></i> Adicione todos os dependentes do funcionário para fins de Imposto de Renda e benefícios.</p>
                </div>

                <form class="dependents-form-content" id="dependentsForm">
                    <div class="dependents-container" id="dependentsContainer">
                        <!-- Dependente inicial será adicionado via JavaScript -->
                    </div>
                    
                    <div class="add-dependent-section">
                        <button type="button" class="btn-add-dependent" onclick="addDependent()">
                            <i class="fas fa-plus"></i> Adicionar Dependente
                        </button>
                    </div>
                </form>

                <div class="modal-footer">
                    <button type="button" class="btn-secondary" onclick="closeModal()">
                        <i class="fas fa-times"></i> Cancelar
                    </button>
                    <button type="button" class="btn-primary" onclick="saveDependentsDraft()">
                        <i class="fas fa-save"></i> Salvar Rascunho
                    </button>
                    <button type="button" class="btn-success" onclick="submitDependentsData()">
                        <i class="fas fa-paper-plane"></i> Enviar
                    </button>
                </div>
            </div>
        </div>
    `;
    
    targetContainer.innerHTML = formHTML;
    initializeDependentsForm();
    startAutoSave();
}

// ===== INICIALIZAÇÃO DOS FORMULÁRIOS =====

function initializeEmployeeForm() {
    console.log('Inicializando formulário de funcionário');
    
    try {
        
        loadEmployeeData();
        
        setupEmployeeMasks();
       
        setupEmployeeValidations();
        
        console.log('Formulário de funcionário inicializado com sucesso');
    } catch (error) {
        console.error('Erro ao inicializar formulário de funcionário:', error);
    }
}

/**
 * Abre o formulário de dependentes 
 */
function openDependentsForm() {
    console.log('Abrindo formulário de dependentes');
    
    const targetContainer = document.getElementById('modal-container') || 
                           document.getElementById('modal-container-solicitacoes') ||
                           modalContainer;
    
    if (!targetContainer) {
        console.error('Container de modal não encontrado!');
        if (typeof showToast === 'function') {
            showToast('error', 'Erro', 'Erro ao abrir formulário. Tente novamente.');
        }
        return;
    }
    
    const formHTML = `
        <div class="modal-overlay" id="dependentsModalOverlay">
            <div class="modal-content dependents-form" onclick="event.stopPropagation()">
                <div class="modal-header">
                    <h2><i class="fas fa-users"></i> Dependentes do Funcionário</h2>
                    <button class="close-btn" id="dependentsCloseBtn">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div class="auto-save-indicator">
                    <i class="fas fa-save"></i>
                    <span> Dados salvos automaticamente</span>
                    <div class="save-status" id="saveStatus">
                        <i class="fas fa-check-circle"></i>
                        <span>Salvo</span>
                    </div>
                </div>

                <div class="form-description">
                    <p><i class="fas fa-info-circle"></i> Adicione os dependentes do funcionário para fins de Imposto de Renda e benefícios.</p>
                </div>

                <form class="dependents-form-content" id="dependentsForm">
                    <div class="dependents-controls">
                        <button type="button" class="btn-add-dependent" id="addDependentBtn">
                            <i class="fas fa-plus"></i> Adicionar Dependente
                        </button>
                    </div>
                    
                    <div id="dependentsContainer" class="dependents-container">
                        <!-- Dependentes serão adicionados aqui dinamicamente -->
                    </div>
                </form>

                <div class="modal-footer">
                    <button type="button" class="btn-secondary" id="dependentsCancelBtn">
                        <i class="fas fa-times"></i> Cancelar
                    </button>
                    <button type="button" class="btn-primary" id="dependentsSaveBtn">
                        <i class="fas fa-save"></i> Salvar Rascunho
                    </button>
                    <button type="button" class="btn-success" id="dependentsSubmitBtn">
                        <i class="fas fa-paper-plane"></i> Enviar
                    </button>
                </div>
            </div>
        </div>
    `;
    
    targetContainer.innerHTML = formHTML;
    
    setTimeout(() => {
       
        const closeBtn = document.getElementById('dependentsCloseBtn');
        if (closeBtn) {
            closeBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Botão X clicado');
                closeDependentsModal();
            });
        }
        
       
        const cancelBtn = document.getElementById('dependentsCancelBtn');
        if (cancelBtn) {
            cancelBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Botão Cancelar clicado');
                closeDependentsModal();
            });
        }
        
       
        const saveBtn = document.getElementById('dependentsSaveBtn');
        if (saveBtn) {
            saveBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Botão Salvar clicado');
                saveDependentsDraft();
            });
        }
        
        
        const submitBtn = document.getElementById('dependentsSubmitBtn');
        if (submitBtn) {
            submitBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Botão Enviar clicado');
                submitDependentsData();
            });
        }
        
        
        const addBtn = document.getElementById('addDependentBtn');
        if (addBtn) {
            addBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Botão Adicionar Dependente clicado');
                addDependent();
            });
        }
        
    
        const overlay = document.getElementById('dependentsModalOverlay');
        if (overlay) {
            overlay.addEventListener('click', function(e) {
                if (e.target === overlay) {
                    console.log('Overlay clicado');
                    closeDependentsModal();
                }
            });
        }
        
    }, 100); 
    
   
    if (typeof initializeDependentsForm === 'function') {
        initializeDependentsForm();
    }
    
    if (typeof startAutoSave === 'function') {
        startAutoSave();
    }
}

/**
 * Adiciona um novo dependente ao formulário
 */
function addDependent() {
    const container = document.getElementById('dependentsContainer');
    
    if (!container) {
        console.error('Container de dependentes não encontrado!');
        return;
    }
    
    const dependentCount = container.children.length + 1;
    
    const dependentHTML = `
        <div class="dependent-card" data-dependent="${dependentCount}">
            <div class="dependent-header">
                <h3><i class="fas fa-baby"></i> Dependente ${dependentCount}</h3>
                <button type="button" class="btn-remove-dependent" data-dependent-number="${dependentCount}" title="Remover dependente">
                    <i class="fas fa-trash"></i> Remover
                </button>
            </div>
            
            <div class="dependent-form-grid">
                <div class="form-group full-width">
                    <label for="nome-dependente-${dependentCount}">Nome Completo </label>
                    <input type="text" 
                           id="nome-dependente-${dependentCount}" 
                           name="dependentes[${dependentCount}][nome]" 
                           placeholder="Nome completo do dependente"
                           required>
                </div>
                
                <div class="form-group">
                    <label for="data-nascimento-${dependentCount}">Data de Nascimento </label>
                    <input type="date" 
                           id="data-nascimento-${dependentCount}" 
                           name="dependentes[${dependentCount}][dataNascimento]" 
                           required>
                </div>
                
                <div class="form-group">
                    <label for="cpf-dependente-${dependentCount}">CPF </label>
                    <input type="text" 
                           id="cpf-dependente-${dependentCount}" 
                           name="dependentes[${dependentCount}][cpf]" 
                           placeholder="000.000.000-00"
                           class="cpf-mask"
                           required>
                </div>
                
                <div class="form-group">
                    <label for="tipo-dependente-${dependentCount}">Tipo de Dependente </label>
                    <select id="tipo-dependente-${dependentCount}" 
                            name="dependentes[${dependentCount}][tipo]" 
                            required>
                        <option value="">Selecione...</option>
                        <option value="filho">Filho(a)</option>
                        <option value="conjuge">Cônjuge</option>
                        <option value="companheiro">Companheiro(a)</option>
                        <option value="pai">Pai</option>
                        <option value="mae">Mãe</option>
                        <option value="irmao">Irmão/Irmã</option>
                        <option value="neto">Neto(a)</option>
                        <option value="outro">Outro</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="ir-dependente-${dependentCount}">Dependente para IR </label>
                    <select id="ir-dependente-${dependentCount}" 
                            name="dependentes[${dependentCount}][dependenteIR]" 
                            required>
                        <option value="">Selecione...</option>
                        <option value="sim">Sim</option>
                        <option value="nao">Não</option>
                    </select>
                </div>
            </div>
        </div>
    `;
    
    container.insertAdjacentHTML('beforeend', dependentHTML);
    
    setTimeout(() => {
        const removeBtn = container.querySelector(`[data-dependent-number="${dependentCount}"]`);
        if (removeBtn) {
            removeBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log(`Botão remover dependente ${dependentCount} clicado`);
                removeDependent(this);
            });
        }
    }, 50);
    
    setupDependentsMasks();

    if (typeof showToast === 'function') {
        showToast('success', 'Dependente', `Dependente ${dependentCount} adicionado com sucesso!`);
    }

    if (typeof triggerAutoSave === 'function') {
        triggerAutoSave();
    }
}

/**
 * Remove um dependente do formulário 
 */
function removeDependent(button) {
    const dependentCard = button.closest('.dependent-card');
    
    if (!dependentCard) {
        console.error('Card do dependente não encontrado!');
        return;
    }
    
    const dependentNumber = dependentCard.dataset.dependent;
    const container = document.getElementById('dependentsContainer');
    
    
    if (container && container.children.length === 1) {
        if (typeof showToast === 'function') {
            showToast('warning', 'Atenção', 'Deve haver pelo menos um dependente!');
        }
        return;
    }
    
    if (confirm(`Tem certeza que deseja remover o Dependente ${dependentNumber}?`)) {
        dependentCard.remove();
        
       
        renumberDependents();
        
        if (typeof showToast === 'function') {
            showToast('info', 'Dependente', `Dependente ${dependentNumber} removido com sucesso!`);
        }
        
        
        if (typeof triggerAutoSave === 'function') {
            triggerAutoSave();
        }
    }
}

// ===== FUNÇÃO ESPECÍFICA PARA FECHAR ESTE MODAL =====
function closeDependentsModal() {
    console.log('Fechando modal de dependentes...');
    
    const containers = [
        document.getElementById('modal-container'),
        document.getElementById('modal-container-solicitacoes'),
        document.getElementById('modal-container-fiscal')
    ];
    
    containers.forEach(container => {
        if (container) {
            container.innerHTML = '';
        }
    });
    
    
    const overlay = document.getElementById('dependentsModalOverlay');
    if (overlay && overlay.parentElement) {
        overlay.parentElement.removeChild(overlay);
    }
    
    console.log('Modal de dependentes fechado');
}

/**
 * Inicializa o formulário de dependentes 
 */
function initializeDependentsForm() {
    console.log('Inicializando formulário de dependentes');
    
    try {
       
        loadDependentsData();
        
        
        setTimeout(() => {
            const container = document.getElementById('dependentsContainer');
            if (container && container.children.length === 0) {
                addDependent();
            }
        }, 200);
        
      
        setupDependentsMasks();
        
        console.log('Formulário de dependentes inicializado com sucesso');
    } catch (error) {
        console.error('Erro ao inicializar formulário de dependentes:', error);
    }
}

/**
 * Renumera os dependentes após remoção
 */
function renumberDependents() {
    const dependentCards = document.querySelectorAll('.dependent-card');
    
    dependentCards.forEach((card, index) => {
        const newNumber = index + 1;
        const oldNumber = card.dataset.dependent;
        
       
        card.dataset.dependent = newNumber;
        
        
        const header = card.querySelector('.dependent-header h3');
        if (header) {
            header.innerHTML = `<i class="fas fa-baby"></i> Dependente ${newNumber}`;
        }
        
       
        const removeBtn = card.querySelector('.btn-remove-dependent');
        if (removeBtn) {
            removeBtn.dataset.dependentNumber = newNumber;
        }
        
      
        const inputs = card.querySelectorAll('input, select');
        inputs.forEach(input => {
            if (input.id) {
                input.id = input.id.replace(`-${oldNumber}`, `-${newNumber}`);
            }
            if (input.name) {
                input.name = input.name.replace(`[${oldNumber}]`, `[${newNumber}]`);
            }
        });
        
        
        const labels = card.querySelectorAll('label');
        labels.forEach(label => {
            if (label.getAttribute('for')) {
                label.setAttribute('for', label.getAttribute('for').replace(`-${oldNumber}`, `-${newNumber}`));
            }
        });
    });
}

// ===== MÁSCARAS E VALIDAÇÕES =====


function setupEmployeeMasks() {
   
    const cpfInputs = document.querySelectorAll('.cpf-mask');
    cpfInputs.forEach(input => {
        if (!input.dataset.maskApplied) {
            input.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                value = value.replace(/(\d{3})(\d)/, '$1.$2');
                value = value.replace(/(\d{3})(\d)/, '$1.$2');
                value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
                e.target.value = value;
            });
            input.dataset.maskApplied = 'true';
        }
    });
    
   
    const pisInputs = document.querySelectorAll('.pis-mask');
    pisInputs.forEach(input => {
        if (!input.dataset.maskApplied) {
            input.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                value = value.replace(/(\d{3})(\d)/, '$1.$2');
                value = value.replace(/(\d{5})(\d)/, '$1.$2');
                value = value.replace(/(\d{2})(\d{1})$/, '$1-$2');
                e.target.value = value;
            });
            input.dataset.maskApplied = 'true';
        }
    });
}


function setupDependentsMasks() {
    
    setupEmployeeMasks();
}


/**
 * Salva os dados dos dependentes como rascunho
 */
function saveDependentsDraft() {
    const formData = collectDependentsData();
    
    if (formData) {
        localStorage.setItem('dependentsDraft', JSON.stringify(formData));
        if (typeof showToast === 'function') {
            showToast('success', 'Rascunho', 'Dados dos dependentes salvos como rascunho!');
        }
        if (typeof updateSaveStatus === 'function') {
            updateSaveStatus('Rascunho salvo');
        }
    }
}


function submitDependentsData() {
    if (!validateDependentsForm()) {
        return;
    }
    
    const formData = collectDependentsData();
    
    if (typeof showToast === 'function') {
        showToast('info', 'Envio', 'Enviando dados dos dependentes...');
    }
    
    setTimeout(() => {
        localStorage.removeItem('dependentsDraft');
        if (typeof showToast === 'function') {
            showToast('success', 'Sucesso', 'Dados dos dependentes enviados com sucesso!');
        }
        
        setTimeout(() => {
            closeDependentsModal();
        }, 1500);
    }, 2000);
}


function collectDependentsData() {
    const dependentCards = document.querySelectorAll('.dependent-card');
    const dependentes = [];
    
    dependentCards.forEach((card, index) => {
        const nomeInput = card.querySelector(`input[name*="[nome]"]`);
        const dataNascimentoInput = card.querySelector(`input[name*="[dataNascimento]"]`);
        const cpfInput = card.querySelector(`input[name*="[cpf]"]`);
        const tipoSelect = card.querySelector(`select[name*="[tipo]"]`);
        const dependenteIRSelect = card.querySelector(`select[name*="[dependenteIR]"]`);
        
        const dependente = {
            numero: index + 1,
            nome: nomeInput ? nomeInput.value : '',
            dataNascimento: dataNascimentoInput ? dataNascimentoInput.value : '',
            cpf: cpfInput ? cpfInput.value : '',
            tipo: tipoSelect ? tipoSelect.value : '',
            dependenteIR: dependenteIRSelect ? dependenteIRSelect.value : ''
        };
        
        dependentes.push(dependente);
    });
    
    return {
        dependentes: dependentes,
        timestamp: new Date().toISOString()
    };
}


function validateDependentsForm() {
    const dependentCards = document.querySelectorAll('.dependent-card');
    
    if (dependentCards.length === 0) {
        if (typeof showToast === 'function') {
            showToast('warning', 'Validação', 'Adicione pelo menos um dependente!');
        }
        return false;
    }
    
    let isValid = true;
    
    dependentCards.forEach((card, index) => {
        const requiredFields = card.querySelectorAll('input[required], select[required]');
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.style.borderColor = '#e74c3c';
                isValid = false;
            } else {
                field.style.borderColor = '';
            }
        });
        
      
        const cpfField = card.querySelector('input[name*="[cpf]"]');
        if (cpfField && cpfField.value && !isValidCPF(cpfField.value)) {
            cpfField.style.borderColor = '#e74c3c';
            if (typeof showToast === 'function') {
                showToast('error', 'Validação', `CPF do Dependente ${index + 1} é inválido!`);
            }
            isValid = false;
        }
    });
    
    if (!isValid && typeof showToast === 'function') {
        showToast('error', 'Validação', 'Preencha todos os campos obrigatórios corretamente!');
    }
    
    return isValid;
}


function loadDependentsData() {
    const savedData = localStorage.getItem('dependentsDraft');
    
    if (savedData) {
        try {
            const data = JSON.parse(savedData);
            
            if (data.dependentes && data.dependentes.length > 0) {
               
                const container = document.getElementById('dependentsContainer');
                if (container) {
                    container.innerHTML = '';
                    
                    
                    data.dependentes.forEach((dependente, index) => {
                        addDependent();
                        
                      
                        setTimeout(() => {
                            const card = container.children[index];
                            if (card) {
                                const nomeInput = card.querySelector(`input[name*="[nome]"]`);
                                const dataNascimentoInput = card.querySelector(`input[name*="[dataNascimento]"]`);
                                const cpfInput = card.querySelector(`input[name*="[cpf]"]`);
                                const tipoSelect = card.querySelector(`select[name*="[tipo]"]`);
                                const dependenteIRSelect = card.querySelector(`select[name*="[dependenteIR]"]`);
                                
                                if (nomeInput) nomeInput.value = dependente.nome || '';
                                if (dataNascimentoInput) dataNascimentoInput.value = dependente.dataNascimento || '';
                                if (cpfInput) cpfInput.value = dependente.cpf || '';
                                if (tipoSelect) tipoSelect.value = dependente.tipo || '';
                                if (dependenteIRSelect) dependenteIRSelect.value = dependente.dependenteIR || '';
                            }
                        }, 100);
                    });
                    
                    if (typeof showToast === 'function') {
                        showToast('info', 'Dados Carregados', 'Rascunho dos dependentes carregado!');
                    }
                }
            }
        } catch (error) {
            console.warn('Erro ao carregar dados dos dependentes:', error);
        }
    }
}


function isValidCPF(cpf) {
    cpf = cpf.replace(/[^\d]/g, '');
    
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
        return false;
    }
    
    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    
    let digit = 11 - (sum % 11);
    if (digit === 10 || digit === 11) digit = 0;
    if (digit !== parseInt(cpf.charAt(9))) return false;
    
    sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    
    digit = 11 - (sum % 11);
    if (digit === 10 || digit === 11) digit = 0;
    if (digit !== parseInt(cpf.charAt(10))) return false;
    
    return true;
}

// ===== FUNÇÕES PLACEHOLDER PARA RH =====

function openContractForm() {
    if (typeof showFeatureMessage === 'function') {
        showFeatureMessage('📋 Contratação', 'contratacao');
    }
}

function openBenefitsForm() {
    if (typeof showFeatureMessage === 'function') {
        showFeatureMessage('🎁 Benefícios', 'beneficios');
    }
}

// ===== FORMULÁRIO DE CONTRATAÇÃO =====


function openContractForm() {
    console.log('Abrindo formulário de contratação');
    
   
    const targetContainer = document.getElementById('modal-container') || 
                           document.getElementById('modal-container-solicitacoes') ||
                           modalContainer;
    
    if (!targetContainer) {
        console.error('Container de modal não encontrado!');
        if (typeof showToast === 'function') {
            showToast('error', 'Erro', 'Erro ao abrir formulário. Tente novamente.');
        }
        return;
    }
    
    const formHTML = `
        <div class="modal-overlay" id="contractModalOverlay">
            <div class="modal-content contract-form" onclick="event.stopPropagation()">
                <div class="modal-header">
                    <h2><i class="fas fa-handshake"></i> Dados de Contratação</h2>
                    <button class="close-btn" id="contractCloseBtn">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div class="auto-save-indicator">
                    <i class="fas fa-save"></i>
                    <span> Dados salvos automaticamente</span>
                    <div class="save-status" id="saveStatus">
                        <i class="fas fa-check-circle"></i>
                        <span>Salvo</span>
                    </div>
                </div>

                <div class="form-description">
                    <p><i class="fas fa-info-circle"></i> Preencha as informações contratuais e de alocação do funcionário.</p>
                </div>

                <form class="contract-form-content" id="contractForm">
                    <div class="form-grid">
                        <div class="form-group">
                            <label for="data-admissao">Data de Admissão </label>
                            <input type="date" 
                                   id="data-admissao" 
                                   name="dataAdmissao" 
                                   required>
                        </div>
                        
                        <div class="form-group">
                            <label for="funcao-cargo">Função/Cargo </label>
                            <select id="funcao-cargo" 
                                    name="funcaoCargo" 
                                    required>
                                <option value="">Selecione...</option>
                                <option value="auxiliar-administrativo">Auxiliar Administrativo</option>
                                <option value="assistente-administrativo">Assistente Administrativo</option>
                                <option value="analista">Analista</option>
                                <option value="coordenador">Coordenador</option>
                                <option value="supervisor">Supervisor</option>
                                <option value="gerente">Gerente</option>
                                <option value="diretor">Diretor</option>
                                <option value="operador">Operador</option>
                                <option value="tecnico">Técnico</option>
                                <option value="engenheiro">Engenheiro</option>
                                <option value="contador">Contador</option>
                                <option value="advogado">Advogado</option>
                                <option value="vendedor">Vendedor</option>
                                <option value="motorista">Motorista</option>
                                <option value="seguranca">Segurança</option>
                                <option value="limpeza">Serviços Gerais</option>
                                <option value="outro">Outro</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="funcao-personalizada" class="hidden">Especifique a Função</label>
                            <input type="text" 
                                   id="funcao-personalizada" 
                                   name="funcaoPersonalizada" 
                                   placeholder="Especifique a função"
                                   class="hidden">
                        </div>
                        
                        <div class="form-group">
                            <label for="piso-salarial">Piso Salarial </label>
                            <input type="text" 
                                   id="piso-salarial" 
                                   name="pisoSalarial" 
                                   placeholder="R$ 0,00"
                                   class="currency-mask"
                                   required>
                        </div>
                        
                        <div class="form-group">
                            <label for="jornada-trabalho">Jornada de Trabalho </label>
                            <select id="jornada-trabalho" 
                                    name="jornadaTrabalho" 
                                    required>
                                <option value="">Selecione...</option>
                                <option value="20h">20 horas semanais</option>
                                <option value="30h">30 horas semanais</option>
                                <option value="36h">36 horas semanais</option>
                                <option value="40h">40 horas semanais</option>
                                <option value="44h">44 horas semanais</option>
                                <option value="48h">48 horas semanais (12x36)</option>
                                <option value="personalizada">Jornada Personalizada</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="jornada-personalizada" class="hidden">Especifique a Jornada</label>
                            <input type="text" 
                                   id="jornada-personalizada" 
                                   name="jornadaPersonalizada" 
                                   placeholder="Ex: 42 horas semanais"
                                   class="hidden">
                        </div>
                        
                        <div class="form-group">
                            <label for="local-alocacao">Local de Alocação (Serviço/Obra) </label>
                            <select id="local-alocacao" 
                                    name="localAlocacao" 
                                    required>
                                <option value="">Selecione...</option>
                                <option value="matriz">Matriz - Escritório Central</option>
                                <option value="filial-sp">Filial São Paulo</option>
                                <option value="filial-rj">Filial Rio de Janeiro</option>
                                <option value="filial-mg">Filial Minas Gerais</option>
                                <option value="obra-residencial">Obra Residencial</option>
                                <option value="obra-comercial">Obra Comercial</option>
                                <option value="obra-industrial">Obra Industrial</option>
                                <option value="servico-externo">Serviço Externo</option>
                                <option value="home-office">Home Office</option>
                                <option value="hibrido">Trabalho Híbrido</option>
                                <option value="outro">Outro Local</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="local-personalizado" class="hidden">Especifique o Local</label>
                            <input type="text" 
                                   id="local-personalizado" 
                                   name="localPersonalizado" 
                                   placeholder="Especifique o local de trabalho"
                                   class="hidden">
                        </div>
                        
                        <div class="form-group">
                            <label for="horario-refeicao">Horário de Refeição</label>
                            <input type="text" 
                                   id="horario-refeicao" 
                                   name="horarioRefeicao" 
                                   placeholder="Ex: 12:00 às 13:00"
                                   class="time-range-mask">
                        </div>
                        
                        <div class="form-group">
                            <label for="horario-descanso">Horário de Descanso</label>
                            <input type="text" 
                                   id="horario-descanso" 
                                   name="horarioDescanso" 
                                   placeholder="Ex: 15:00 às 15:15"
                                   class="time-range-mask">
                        </div>
                        
                        <div class="form-group full-width">
                            <label for="observacoes-contratuais">Observações Contratuais</label>
                            <textarea id="observacoes-contratuais" 
                                      name="observacoesContratuais" 
                                      rows="3" 
                                      placeholder="Informações adicionais sobre o contrato (opcional)"></textarea>
                        </div>
                    </div>
                </form>

                <div class="modal-footer">
                    <button type="button" class="btn-secondary" id="contractCancelBtn">
                        <i class="fas fa-times"></i> Cancelar
                    </button>
                    <button type="button" class="btn-primary" id="contractSaveBtn">
                        <i class="fas fa-save"></i> Salvar Rascunho
                    </button>
                    <button type="button" class="btn-success" id="contractSubmitBtn">
                        <i class="fas fa-paper-plane"></i> Enviar
                    </button>
                </div>
            </div>
        </div>
    `;
    
    targetContainer.innerHTML = formHTML;
    

    setTimeout(() => {
       
        const closeBtn = document.getElementById('contractCloseBtn');
        if (closeBtn) {
            closeBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Botão X clicado');
                closeContractModal();
            });
        }
        
       
        const cancelBtn = document.getElementById('contractCancelBtn');
        if (cancelBtn) {
            cancelBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Botão Cancelar clicado');
                closeContractModal();
            });
        }
        
        
        const saveBtn = document.getElementById('contractSaveBtn');
        if (saveBtn) {
            saveBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Botão Salvar clicado');
                saveContractDraft();
            });
        }
        
        
        const submitBtn = document.getElementById('contractSubmitBtn');
        if (submitBtn) {
            submitBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Botão Enviar clicado');
                submitContractData();
            });
        }
        
     
        const overlay = document.getElementById('contractModalOverlay');
        if (overlay) {
            overlay.addEventListener('click', function(e) {
                if (e.target === overlay) {
                    console.log('Overlay clicado');
                    closeContractModal();
                }
            });
        }
        
    }, 100); 
    
   
    if (typeof initializeContractForm === 'function') {
        initializeContractForm();
    }
    
    if (typeof startAutoSave === 'function') {
        startAutoSave();
    }
}


function closeContractModal() {
    console.log('Fechando modal de contratação...');
    
    const containers = [
        document.getElementById('modal-container'),
        document.getElementById('modal-container-solicitacoes'),
        document.getElementById('modal-container-fiscal')
    ];
    
    containers.forEach(container => {
        if (container) {
            container.innerHTML = '';
        }
    });
    
   
    const overlay = document.getElementById('contractModalOverlay');
    if (overlay && overlay.parentElement) {
        overlay.parentElement.removeChild(overlay);
    }
    
    console.log('Modal de contratação fechado');
}


function initializeContractForm() {
    console.log('Inicializando formulário de contratação');
    
    try {
       
        loadContractData();
        
        
        setupContractMasks();
        
        
        setupConditionalFields();
        
        console.log('Formulário de contratação inicializado com sucesso');
    } catch (error) {
        console.error('Erro ao inicializar formulário de contratação:', error);
    }
}


function setupConditionalFields() {
    
    const funcaoSelect = document.getElementById('funcao-cargo');
    const funcaoPersonalizada = document.getElementById('funcao-personalizada');
    
    if (funcaoSelect && funcaoPersonalizada) {
        funcaoSelect.addEventListener('change', function() {
            if (this.value === 'outro') {
                showField(funcaoPersonalizada);
                funcaoPersonalizada.required = true;
            } else {
                hideField(funcaoPersonalizada);
                funcaoPersonalizada.required = false;
                funcaoPersonalizada.value = '';
            }
        });
    }
    
   
    const jornadaSelect = document.getElementById('jornada-trabalho');
    const jornadaPersonalizada = document.getElementById('jornada-personalizada');
    
    if (jornadaSelect && jornadaPersonalizada) {
        jornadaSelect.addEventListener('change', function() {
            if (this.value === 'personalizada') {
                showField(jornadaPersonalizada);
                jornadaPersonalizada.required = true;
            } else {
                hideField(jornadaPersonalizada);
                jornadaPersonalizada.required = false;
                jornadaPersonalizada.value = '';
            }
        });
    }
    
    
    const localSelect = document.getElementById('local-alocacao');
    const localPersonalizado = document.getElementById('local-personalizado');
    
    if (localSelect && localPersonalizado) {
        localSelect.addEventListener('change', function() {
            if (this.value === 'outro') {
                showField(localPersonalizado);
                localPersonalizado.required = true;
            } else {
                hideField(localPersonalizado);
                localPersonalizado.required = false;
                localPersonalizado.value = '';
            }
        });
    }
}


function showField(field) {
    if (field) {
        field.classList.remove('hidden');
        const label = field.previousElementSibling;
        if (label && label.tagName === 'LABEL') {
            label.classList.remove('hidden');
        }
    }
}


function hideField(field) {
    if (field) {
        field.classList.add('hidden');
        const label = field.previousElementSibling;
        if (label && label.tagName === 'LABEL') {
            label.classList.add('hidden');
        }
    }
}


function setupContractMasks() {
   
    const currencyInputs = document.querySelectorAll('.currency-mask');
    currencyInputs.forEach(input => {
        if (!input.dataset.maskApplied) {
            input.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                
                if (value === '') {
                    e.target.value = '';
                    return;
                }
                
               
                value = parseInt(value);
                value = (value / 100).toFixed(2);
                
               
                value = 'R$ ' + value.replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
                e.target.value = value;
            });
            
            input.addEventListener('focus', function(e) {
                if (e.target.value === 'R$ 0,00') {
                    e.target.value = '';
                }
            });
            
            input.addEventListener('blur', function(e) {
                if (e.target.value === '' || e.target.value === 'R$ ') {
                    e.target.value = 'R$ 0,00';
                }
            });
            
            input.dataset.maskApplied = 'true';
        }
    });
    
   
    const timeRangeInputs = document.querySelectorAll('.time-range-mask');
    timeRangeInputs.forEach(input => {
        if (!input.dataset.maskApplied) {
            input.addEventListener('input', function(e) {
                let value = e.target.value.replace(/[^\d]/g, '');
                
                if (value.length === 0) {
                    e.target.value = '';
                    return;
                }
                
                if (value.length <= 2) {
                    e.target.value = value;
                } else if (value.length <= 4) {
                    
                    let hours = value.substring(0, 2);
                    let minutes = value.substring(2, 4);
                    
                    
                    if (parseInt(hours) > 23) hours = '23';
                    
                    if (parseInt(minutes) > 59) minutes = '59';
                    
                    e.target.value = `${hours}:${minutes}`;
                } else if (value.length <= 6) {
                    
                    let firstHours = value.substring(0, 2);
                    let firstMinutes = value.substring(2, 4);
                    let secondHours = value.substring(4, 6);
                    
                    if (parseInt(firstHours) > 23) firstHours = '23';
                    if (parseInt(firstMinutes) > 59) firstMinutes = '59';
                    
                    e.target.value = `${firstHours}:${firstMinutes} às ${secondHours}`;
                } else {
                    
                    let firstHours = value.substring(0, 2);
                    let firstMinutes = value.substring(2, 4);
                    let secondHours = value.substring(4, 6);
                    let secondMinutes = value.substring(6, 8);
                    
                    if (parseInt(firstHours) > 23) firstHours = '23';
                    if (parseInt(firstMinutes) > 59) firstMinutes = '59';
                    if (parseInt(secondHours) > 23) secondHours = '23';
                    if (parseInt(secondMinutes) > 59) secondMinutes = '59';
                    
                    e.target.value = `${firstHours}:${firstMinutes} às ${secondHours}:${secondMinutes}`;
                }
            });
            input.dataset.maskApplied = 'true';
        }
    });
}


function saveContractDraft() {
    const formData = collectContractData();
    
    if (formData) {
        localStorage.setItem('contractDraft', JSON.stringify(formData));
        if (typeof showToast === 'function') {
            showToast('success', 'Rascunho', 'Dados de contratação salvos como rascunho!');
        }
        if (typeof updateSaveStatus === 'function') {
            updateSaveStatus('Rascunho salvo');
        }
    }
}


function submitContractData() {
    if (!validateContractForm()) {
        return;
    }
    
    const formData = collectContractData();
    
    if (typeof showToast === 'function') {
        showToast('info', 'Envio', 'Enviando dados de contratação...');
    }
    
    setTimeout(() => {
        localStorage.removeItem('contractDraft');
        if (typeof showToast === 'function') {
            showToast('success', 'Sucesso', 'Dados de contratação enviados com sucesso!');
        }
        
        setTimeout(() => {
            closeContractModal();
        }, 1500);
    }, 2000);
}


function collectContractData() {
    const form = document.getElementById('contractForm');
    if (!form) return null;
    
    const formData = new FormData(form);
    
    const data = {
        dataAdmissao: formData.get('dataAdmissao'),
        funcaoCargo: formData.get('funcaoCargo'),
        funcaoPersonalizada: formData.get('funcaoPersonalizada'),
        pisoSalarial: formData.get('pisoSalarial'),
        jornadaTrabalho: formData.get('jornadaTrabalho'),
        jornadaPersonalizada: formData.get('jornadaPersonalizada'),
        localAlocacao: formData.get('localAlocacao'),
        localPersonalizado: formData.get('localPersonalizado'),
        horarioRefeicao: formData.get('horarioRefeicao'),
        horarioDescanso: formData.get('horarioDescanso'),
        observacoesContratuais: formData.get('observacoesContratuais'),
        timestamp: new Date().toISOString()
    };
    
    return data;
}


function validateContractForm() {
    const requiredFields = document.querySelectorAll('#contractForm [required]');
    let isValid = true;
    
   
    requiredFields.forEach(field => {
        field.style.borderColor = '';
    });
    

    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = '#e74c3c';
            isValid = false;
        }
    });
    
  
    const dataAdmissaoField = document.getElementById('data-admissao');
    if (dataAdmissaoField && dataAdmissaoField.value) {
        const admissionDate = new Date(dataAdmissaoField.value);
        const today = new Date();
        const oneYearFromNow = new Date();
        oneYearFromNow.setFullYear(today.getFullYear() + 1);
        
        if (admissionDate > oneYearFromNow) {
            dataAdmissaoField.style.borderColor = '#e74c3c';
            if (typeof showToast === 'function') {
                showToast('error', 'Validação', 'Data de admissão não pode ser superior a 1 ano no futuro!');
            }
            isValid = false;
        }
    }
    
    
    const pisoSalarialField = document.getElementById('piso-salarial');
    if (pisoSalarialField && pisoSalarialField.value) {
        const valorText = pisoSalarialField.value.replace(/[^\d,]/g, '').replace(',', '.');
        const valor = parseFloat(valorText);
        
        if (isNaN(valor) || valor <= 0) {
            pisoSalarialField.style.borderColor = '#e74c3c';
            if (typeof showToast === 'function') {
                showToast('error', 'Validação', 'Piso salarial deve ser maior que zero!');
            }
            isValid = false;
        } else if (valor < 1320) { 
            pisoSalarialField.style.borderColor = '#e74c3c';
            if (typeof showToast === 'function') {
                showToast('warning', 'Atenção', 'Valor abaixo do salário mínimo. Verifique se está correto.');
            }
        }
    }
    
    
    const horarioRefeicaoField = document.getElementById('horario-refeicao');
    const horarioDescansoField = document.getElementById('horario-descanso');
    
    if (horarioRefeicaoField && horarioRefeicaoField.value && !isValidTimeRange(horarioRefeicaoField.value)) {
        horarioRefeicaoField.style.borderColor = '#e74c3c';
        if (typeof showToast === 'function') {
            showToast('error', 'Validação', 'Formato de horário de refeição inválido! Use: HH:MM às HH:MM');
        }
        isValid = false;
    }
    
    if (horarioDescansoField && horarioDescansoField.value && !isValidTimeRange(horarioDescansoField.value)) {
        horarioDescansoField.style.borderColor = '#e74c3c';
        if (typeof showToast === 'function') {
            showToast('error', 'Validação', 'Formato de horário de descanso inválido! Use: HH:MM às HH:MM');
        }
        isValid = false;
    }
    
    if (!isValid && typeof showToast === 'function') {
        showToast('error', 'Validação', 'Preencha todos os campos obrigatórios corretamente!');
    }
    
    return isValid;
}


function isValidTimeRange(timeRange) {
    const regex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9] às ([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    
    if (!regex.test(timeRange)) {
        return false;
    }
    
  
    const parts = timeRange.split(' às ');
    const [startHour, startMinute] = parts[0].split(':').map(Number);
    const [endHour, endMinute] = parts[1].split(':').map(Number);
    
    const startTime = startHour * 60 + startMinute;
    const endTime = endHour * 60 + endMinute;
    
    return endTime > startTime;
}


function loadContractData() {
    const savedData = localStorage.getItem('contractDraft');
    
    if (savedData) {
        try {
            const data = JSON.parse(savedData);
            
            
            Object.keys(data).forEach(key => {
                if (key === 'timestamp') return; 
                
                const field = document.querySelector(`[name="${key}"]`);
                if (field && data[key]) {
                    field.value = data[key];
                    
                    
                    if (field.tagName === 'SELECT') {
                        field.dispatchEvent(new Event('change'));
                    }
                }
            });
            
            if (typeof showToast === 'function') {
                showToast('info', 'Dados Carregados', 'Rascunho de contratação carregado!');
            }
        } catch (error) {
            console.warn('Erro ao carregar dados de contratação:', error);
        }
    }
}

// ===== FORMULÁRIO DE BENEFÍCIOS =====


function openBenefitsForm() {
    console.log('Abrindo formulário de benefícios');
    
   
    const targetContainer = document.getElementById('modal-container') || 
                           document.getElementById('modal-container-solicitacoes') ||
                           modalContainer;
    
    if (!targetContainer) {
        console.error('Container de modal não encontrado!');
        if (typeof showToast === 'function') {
            showToast('error', 'Erro', 'Erro ao abrir formulário. Tente novamente.');
        }
        return;
    }
    
    const formHTML = `
        <div class="modal-overlay" id="benefitsModalOverlay">
            <div class="modal-content benefits-form" onclick="event.stopPropagation()">
                <div class="modal-header">
                    <h2><i class="fas fa-gift"></i> Benefícios Oferecidos</h2>
                    <button class="close-btn" id="benefitsCloseBtn">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div class="auto-save-indicator">
                    <i class="fas fa-save"></i>
                    <span> Dados salvos automaticamente</span>
                    <div class="save-status" id="saveStatus">
                        <i class="fas fa-check-circle"></i>
                        <span>Salvo</span>
                    </div>
                </div>

                <div class="form-description">
                    <p><i class="fas fa-info-circle"></i> Selecione os benefícios que serão oferecidos ao funcionário.</p>
                </div>

                <form class="benefits-form-content" id="benefitsForm">
                    <div class="benefits-grid">
                        <!-- Benefícios Alimentação -->
                        <div class="benefit-category">
                            <h3><i class="fas fa-utensils"></i> Alimentação</h3>
                            <div class="benefit-options">
                                <div class="benefit-item">
                                    <label class="benefit-checkbox">
                                        <input type="checkbox" name="beneficios[]" value="cesta-basica" id="cesta-basica">
                                        <span class="checkmark"></span>
                                        <div class="benefit-info">
                                            <strong>Cesta Básica</strong>
                                            <small>Fornecimento mensal de cesta básica</small>
                                        </div>
                                    </label>
                                    <div class="benefit-details" id="details-cesta-basica" style="display: none;">
                                        <input type="text" name="valor-cesta-basica" placeholder="Valor (R$)" class="currency-mask">
                                    </div>
                                </div>
                                
                                <div class="benefit-item">
                                    <label class="benefit-checkbox">
                                        <input type="checkbox" name="beneficios[]" value="vale-refeicao" id="vale-refeicao">
                                        <span class="checkmark"></span>
                                        <div class="benefit-info">
                                            <strong>Vale Refeição (VR)</strong>
                                            <small>Auxílio para refeições durante o trabalho</small>
                                        </div>
                                    </label>
                                    <div class="benefit-details" id="details-vale-refeicao" style="display: none;">
                                        <input type="text" name="valor-vale-refeicao" placeholder="Valor diário (R$)" class="currency-mask">
                                    </div>
                                </div>
                                
                                <div class="benefit-item">
                                    <label class="benefit-checkbox">
                                        <input type="checkbox" name="beneficios[]" value="vale-alimentacao" id="vale-alimentacao">
                                        <span class="checkmark"></span>
                                        <div class="benefit-info">
                                            <strong>Vale Alimentação (VA)</strong>
                                            <small>Auxílio para compra de alimentos</small>
                                        </div>
                                    </label>
                                    <div class="benefit-details" id="details-vale-alimentacao" style="display: none;">
                                        <input type="text" name="valor-vale-alimentacao" placeholder="Valor mensal (R$)" class="currency-mask">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Benefícios Transporte -->
                        <div class="benefit-category">
                            <h3><i class="fas fa-bus"></i> Transporte</h3>
                            <div class="benefit-options">
                                <div class="benefit-item">
                                    <label class="benefit-checkbox">
                                        <input type="checkbox" name="beneficios[]" value="vale-transporte" id="vale-transporte">
                                        <span class="checkmark"></span>
                                        <div class="benefit-info">
                                            <strong>Vale Transporte (VT)</strong>
                                            <small>Auxílio para deslocamento casa-trabalho</small>
                                        </div>
                                    </label>
                                    <div class="benefit-details" id="details-vale-transporte" style="display: none;">
                                        <input type="text" name="valor-vale-transporte" placeholder="Valor diário (R$)" class="currency-mask">
                                    </div>
                                </div>
                                
                                <div class="benefit-item">
                                    <label class="benefit-checkbox">
                                        <input type="checkbox" name="beneficios[]" value="fretado" id="fretado">
                                        <span class="checkmark"></span>
                                        <div class="benefit-info">
                                            <strong>Transporte Fretado</strong>
                                            <small>Ônibus da empresa para funcionários</small>
                                        </div>
                                    </label>
                                </div>
                                
                                <div class="benefit-item">
                                    <label class="benefit-checkbox">
                                        <input type="checkbox" name="beneficios[]" value="estacionamento" id="estacionamento">
                                        <span class="checkmark"></span>
                                        <div class="benefit-info">
                                            <strong>Estacionamento</strong>
                                            <small>Vaga de estacionamento gratuita</small>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <!-- Benefícios Saúde -->
                        <div class="benefit-category">
                            <h3><i class="fas fa-heart"></i> Saúde e Bem-estar</h3>
                            <div class="benefit-options">
                                <div class="benefit-item">
                                    <label class="benefit-checkbox">
                                        <input type="checkbox" name="beneficios[]" value="plano-saude" id="plano-saude">
                                        <span class="checkmark"></span>
                                        <div class="benefit-info">
                                            <strong>Plano de Saúde</strong>
                                            <small>Assistência médica e hospitalar</small>
                                        </div>
                                    </label>
                                    <div class="benefit-details" id="details-plano-saude" style="display: none;">
                                        <select name="tipo-plano-saude">
                                            <option value="">Selecione o tipo</option>
                                            <option value="individual">Individual</option>
                                            <option value="familiar">Familiar</option>
                                        </select>
                                        <input type="text" name="desconto-plano-saude" placeholder="% Desconto funcionário" class="percent-mask">
                                    </div>
                                </div>
                                
                                <div class="benefit-item">
                                    <label class="benefit-checkbox">
                                        <input type="checkbox" name="beneficios[]" value="plano-odontologico" id="plano-odontologico">
                                        <span class="checkmark"></span>
                                        <div class="benefit-info">
                                            <strong>Plano Odontológico</strong>
                                            <small>Assistência odontológica</small>
                                        </div>
                                    </label>
                                    <div class="benefit-details" id="details-plano-odontologico" style="display: none;">
                                        <select name="tipo-plano-odontologico">
                                            <option value="">Selecione o tipo</option>
                                            <option value="individual">Individual</option>
                                            <option value="familiar">Familiar</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <div class="benefit-item">
                                    <label class="benefit-checkbox">
                                        <input type="checkbox" name="beneficios[]" value="seguro-vida" id="seguro-vida">
                                        <span class="checkmark"></span>
                                        <div class="benefit-info">
                                            <strong>Seguro de Vida</strong>
                                            <small>Proteção em caso de acidentes</small>
                                        </div>
                                    </label>
                                    <div class="benefit-details" id="details-seguro-vida" style="display: none;">
                                        <input type="text" name="valor-seguro-vida" placeholder="Valor da cobertura (R$)" class="currency-mask">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Benefícios Educação -->
                        <div class="benefit-category">
                            <h3><i class="fas fa-graduation-cap"></i> Educação e Desenvolvimento</h3>
                            <div class="benefit-options">
                                <div class="benefit-item">
                                    <label class="benefit-checkbox">
                                        <input type="checkbox" name="beneficios[]" value="auxilio-educacao" id="auxilio-educacao">
                                        <span class="checkmark"></span>
                                        <div class="benefit-info">
                                            <strong>Auxílio Educação</strong>
                                            <small>Reembolso de cursos e faculdade</small>
                                        </div>
                                    </label>
                                    <div class="benefit-details" id="details-auxilio-educacao" style="display: none;">
                                        <input type="text" name="valor-auxilio-educacao" placeholder="Valor máximo (R$)" class="currency-mask">
                                        <input type="text" name="percentual-reembolso" placeholder="% Reembolso" class="percent-mask">
                                    </div>
                                </div>
                                
                                <div class="benefit-item">
                                    <label class="benefit-checkbox">
                                        <input type="checkbox" name="beneficios[]" value="treinamentos" id="treinamentos">
                                        <span class="checkmark"></span>
                                        <div class="benefit-info">
                                            <strong>Treinamentos</strong>
                                            <small>Cursos e capacitações profissionais</small>
                                        </div>
                                    </label>
                                </div>
                                
                                <div class="benefit-item">
                                    <label class="benefit-checkbox">
                                        <input type="checkbox" name="beneficios[]" value="idiomas" id="idiomas">
                                        <span class="checkmark"></span>
                                        <div class="benefit-info">
                                            <strong>Curso de Idiomas</strong>
                                            <small>Aulas de inglês, espanhol, etc.</small>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <!-- Benefícios Flexibilidade -->
                        <div class="benefit-category">
                            <h3><i class="fas fa-clock"></i> Flexibilidade e Qualidade de Vida</h3>
                            <div class="benefit-options">
                                <div class="benefit-item">
                                    <label class="benefit-checkbox">
                                        <input type="checkbox" name="beneficios[]" value="horario-flexivel" id="horario-flexivel">
                                        <span class="checkmark"></span>
                                        <div class="benefit-info">
                                            <strong>Horário Flexível</strong>
                                            <small>Flexibilidade nos horários de trabalho</small>
                                        </div>
                                    </label>
                                </div>
                                
                                <div class="benefit-item">
                                    <label class="benefit-checkbox">
                                        <input type="checkbox" name="beneficios[]" value="home-office" id="home-office">
                                        <span class="checkmark"></span>
                                        <div class="benefit-info">
                                            <strong>Home Office</strong>
                                            <small>Trabalho remoto parcial ou total</small>
                                        </div>
                                    </label>
                                    <div class="benefit-details" id="details-home-office" style="display: none;">
                                        <select name="frequencia-home-office">
                                            <option value="">Frequência</option>
                                            <option value="1x-semana">1x por semana</option>
                                            <option value="2x-semana">2x por semana</option>
                                            <option value="3x-semana">3x por semana</option>
                                            <option value="integral">Integral</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <div class="benefit-item">
                                    <label class="benefit-checkbox">
                                        <input type="checkbox" name="beneficios[]" value="gympass" id="gympass">
                                        <span class="checkmark"></span>
                                        <div class="benefit-info">
                                            <strong>Gympass/Academia</strong>
                                            <small>Acesso a academias e atividades físicas</small>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <!-- Benefícios Financeiros -->
                        <div class="benefit-category">
                            <h3><i class="fas fa-dollar-sign"></i> Benefícios Financeiros</h3>
                            <div class="benefit-options">
                                <div class="benefit-item">
                                    <label class="benefit-checkbox">
                                        <input type="checkbox" name="beneficios[]" value="ppr" id="ppr">
                                        <span class="checkmark"></span>
                                        <div class="benefit-info">
                                            <strong>PPR (Participação nos Resultados)</strong>
                                            <small>Bonificação anual baseada em metas</small>
                                        </div>
                                    </label>
                                    <div class="benefit-details" id="details-ppr" style="display: none;">
                                        <input type="text" name="valor-ppr" placeholder="Valor estimado (R$)" class="currency-mask">
                                    </div>
                                </div>
                                
                                <div class="benefit-item">
                                    <label class="benefit-checkbox">
                                        <input type="checkbox" name="beneficios[]" value="previdencia" id="previdencia">
                                        <span class="checkmark"></span>
                                        <div class="benefit-info">
                                            <strong>Previdência Privada</strong>
                                            <small>Complementação da aposentadoria</small>
                                        </div>
                                    </label>
                                    <div class="benefit-details" id="details-previdencia" style="display: none;">
                                        <input type="text" name="contribuicao-empresa" placeholder="% Contribuição empresa" class="percent-mask">
                                    </div>
                                </div>
                                
                                <div class="benefit-item">
                                    <label class="benefit-checkbox">
                                        <input type="checkbox" name="beneficios[]" value="adiantamento" id="adiantamento">
                                        <span class="checkmark"></span>
                                        <div class="benefit-info">
                                            <strong>Adiantamento Salarial</strong>
                                            <small>Possibilidade de adiantamento do salário</small>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="benefits-summary">
                        <h4><i class="fas fa-list"></i> Resumo dos Benefícios Selecionados</h4>
                        <div id="selected-benefits" class="selected-benefits-list">
                            <p class="no-benefits">Nenhum benefício selecionado</p>
                        </div>
                    </div>
                </form>

                <div class="modal-footer">
                    <button type="button" class="btn-secondary" id="benefitsCancelBtn">
                        <i class="fas fa-times"></i> Cancelar
                    </button>
                    <button type="button" class="btn-primary" id="benefitsSaveBtn">
                        <i class="fas fa-save"></i> Salvar Rascunho
                    </button>
                    <button type="button" class="btn-success" id="benefitsSubmitBtn">
                        <i class="fas fa-paper-plane"></i> Enviar
                    </button>
                </div>
            </div>
        </div>
    `;
    
    targetContainer.innerHTML = formHTML;
    

    setTimeout(() => {
       
        const closeBtn = document.getElementById('benefitsCloseBtn');
        if (closeBtn) {
            closeBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Botão X clicado');
                closeBenefitsModal();
            });
        }
        
        
        const cancelBtn = document.getElementById('benefitsCancelBtn');
        if (cancelBtn) {
            cancelBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Botão Cancelar clicado');
                closeBenefitsModal();
            });
        }
        
        
        const saveBtn = document.getElementById('benefitsSaveBtn');
        if (saveBtn) {
            saveBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Botão Salvar clicado');
                saveBenefitsDraft();
            });
        }
        
       
        const submitBtn = document.getElementById('benefitsSubmitBtn');
        if (submitBtn) {
            submitBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Botão Enviar clicado');
                submitBenefitsData();
            });
        }
        
      
        const overlay = document.getElementById('benefitsModalOverlay');
        if (overlay) {
            overlay.addEventListener('click', function(e) {
                if (e.target === overlay) {
                    console.log('Overlay clicado');
                    closeBenefitsModal();
                }
            });
        }
        
    }, 100); 
    
    
    if (typeof initializeBenefitsForm === 'function') {
        initializeBenefitsForm();
    }
    
    if (typeof startAutoSave === 'function') {
        startAutoSave();
    }
}


function closeBenefitsModal() {
    console.log('Fechando modal de benefícios...');
    
    const containers = [
        document.getElementById('modal-container'),
        document.getElementById('modal-container-solicitacoes'),
        document.getElementById('modal-container-fiscal')
    ];
    
    containers.forEach(container => {
        if (container) {
            container.innerHTML = '';
        }
    });
    
   
    const overlay = document.getElementById('benefitsModalOverlay');
    if (overlay && overlay.parentElement) {
        overlay.parentElement.removeChild(overlay);
    }
    
    console.log('Modal de benefícios fechado');
}


function initializeBenefitsForm() {
    console.log('Inicializando formulário de benefícios');
    
    try {
        
        loadBenefitsData();
        
        
        setupBenefitsMasks();
        
        setupBenefitsEvents();
        
        updateBenefitsSummary();
        
        console.log('Formulário de benefícios inicializado com sucesso');
    } catch (error) {
        console.error('Erro ao inicializar formulário de benefícios:', error);
    }
}


function setupBenefitsEvents() {
    const checkboxes = document.querySelectorAll('input[name="beneficios[]"]');
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const detailsId = `details-${this.value}`;
            const detailsDiv = document.getElementById(detailsId);
            
            if (detailsDiv) {
                if (this.checked) {
                    detailsDiv.style.display = 'block';
                    detailsDiv.style.animation = 'fadeInDown 0.3s ease-out';
                    
                    const requiredInputs = detailsDiv.querySelectorAll('input[placeholder*="Valor"]');
                    requiredInputs.forEach(input => {
                        input.setAttribute('data-required-when-checked', 'true');
                    });
                } else {
                    detailsDiv.style.display = 'none';
                    
                    const inputs = detailsDiv.querySelectorAll('input, select');
                    inputs.forEach(input => {
                        input.value = '';
                        input.removeAttribute('data-required-when-checked');
                    });
                }
            }
            
            updateBenefitsSummary();
            if (typeof triggerAutoSave === 'function') {
                triggerAutoSave();
            }
        });
    });
}


function setupBenefitsMasks() {
    const currencyInputs = document.querySelectorAll('.currency-mask');
    currencyInputs.forEach(input => {
        if (!input.dataset.maskApplied) {
            input.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                
                if (value === '') {
                    e.target.value = '';
                    return;
                }
                
                value = parseInt(value);
                value = (value / 100).toFixed(2);
                
                value = 'R$ ' + value.replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
                e.target.value = value;
            });
            
            input.addEventListener('focus', function(e) {
                if (e.target.value === 'R$ 0,00') {
                    e.target.value = '';
                }
            });
            
            input.addEventListener('blur', function(e) {
                if (e.target.value === '' || e.target.value === 'R$ ') {
                    e.target.value = 'R$ 0,00';
                }
            });
            
            input.dataset.maskApplied = 'true';
        }
    });
    
    const percentInputs = document.querySelectorAll('.percent-mask');
    percentInputs.forEach(input => {
        if (!input.dataset.maskApplied) {
            input.addEventListener('input', function(e) {
                let value = e.target.value.replace(/[^\d]/g, '');
                
                if (value === '') {
                    e.target.value = '';
                    return;
                }
                
                value = Math.min(100, parseInt(value));
                e.target.value = value + '%';
            });
            
            input.addEventListener('focus', function(e) {
                if (e.target.value === '0%') {
                    e.target.value = '';
                }
            });
            
            input.addEventListener('blur', function(e) {
                if (e.target.value === '' || e.target.value === '%') {
                    e.target.value = '0%';
                }
            });
            
            input.dataset.maskApplied = 'true';
        }
    });
}


function updateBenefitsSummary() {
    const checkedBoxes = document.querySelectorAll('input[name="beneficios[]"]:checked');
    const summaryDiv = document.getElementById('selected-benefits');
    
    if (!summaryDiv) return;
    
    if (checkedBoxes.length === 0) {
        summaryDiv.innerHTML = '<p class="no-benefits">Nenhum benefício selecionado</p>';
        return;
    }
    
    let summaryHTML = '<ul class="benefits-list">';
    
    checkedBoxes.forEach(checkbox => {
        const benefitItem = checkbox.closest('.benefit-item');
        const benefitInfo = benefitItem ? benefitItem.querySelector('.benefit-info strong') : null;
        
        if (benefitInfo) {
            const benefitName = benefitInfo.textContent;
            summaryHTML += `<li><i class="fas fa-check"></i> ${benefitName}</li>`;
        }
    });
    
    summaryHTML += '</ul>';
    summaryDiv.innerHTML = summaryHTML;
}


function saveBenefitsDraft() {
    const formData = collectBenefitsData();
    
    if (formData) {
        localStorage.setItem('benefitsDraft', JSON.stringify(formData));
        if (typeof showToast === 'function') {
            showToast('success', 'Rascunho', 'Dados de benefícios salvos como rascunho!');
        }
        if (typeof updateSaveStatus === 'function') {
            updateSaveStatus('Rascunho salvo');
        }
    }
}


function submitBenefitsData() {
    if (!validateBenefitsForm()) {
        return;
    }
    
    const formData = collectBenefitsData();
    
    if (typeof showToast === 'function') {
        showToast('info', 'Envio', 'Enviando dados de benefícios...');
    }
    
    setTimeout(() => {
        localStorage.removeItem('benefitsDraft');
        if (typeof showToast === 'function') {
            showToast('success', 'Sucesso', 'Dados de benefícios enviados com sucesso!');
        }
        
        setTimeout(() => {
            closeBenefitsModal();
        }, 1500);
    }, 2000);
}


function collectBenefitsData() {
    const form = document.getElementById('benefitsForm');
    if (!form) return null;
    
    const formData = new FormData(form);
    
    const data = {
        beneficiosSelecionados: formData.getAll('beneficios[]'),
        detalhes: {},
        timestamp: new Date().toISOString()
    };
    
    const allInputs = form.querySelectorAll('input:not([type="checkbox"]), select');
    allInputs.forEach(input => {
        if (input.value && input.name !== 'beneficios[]') {
            data.detalhes[input.name] = input.value;
        }
    });
    
    return data;
}


function validateBenefitsForm() {
    const checkedBoxes = document.querySelectorAll('input[name="beneficios[]"]:checked');
    
    if (checkedBoxes.length === 0) {
        if (typeof showToast === 'function') {
            showToast('warning', 'Validação', 'Selecione pelo menos um benefício!');
        }
        return false;
    }
    
    let isValid = true;
    
    checkedBoxes.forEach(checkbox => {
        const detailsId = `details-${checkbox.value}`;
        const detailsDiv = document.getElementById(detailsId);
        
        if (detailsDiv) {
            const requiredInputs = detailsDiv.querySelectorAll('input[data-required-when-checked="true"]');
            
            requiredInputs.forEach(input => {
                if (!input.value || input.value === 'R$ 0,00' || input.value === '0%') {
                    input.style.borderColor = '#e74c3c';
                    isValid = false;
                } else {
                    input.style.borderColor = '';
                }
            });
        }
    });
    
    const currencyInputs = document.querySelectorAll('.currency-mask');
    currencyInputs.forEach(input => {
        if (input.value && input.value !== 'R$ 0,00') {
            const valorText = input.value.replace(/[^\d,]/g, '').replace(',', '.');
            const valor = parseFloat(valorText);
            
            if (isNaN(valor) || valor <= 0) {
                input.style.borderColor = '#e74c3c';
                if (typeof showToast === 'function') {
                    showToast('error', 'Validação', 'Valores monetários devem ser maiores que zero!');
                }
                isValid = false;
            }
        }
    });
    
    const percentInputs = document.querySelectorAll('.percent-mask');
    percentInputs.forEach(input => {
        if (input.value && input.value !== '0%') {
            const percentValue = parseInt(input.value.replace('%', ''));
            
            if (isNaN(percentValue) || percentValue <= 0 || percentValue > 100) {
                input.style.borderColor = '#e74c3c';
                if (typeof showToast === 'function') {
                    showToast('error', 'Validação', 'Percentuais devem estar entre 1% e 100%!');
                }
                isValid = false;
            }
        }
    });
    
    if (!isValid && typeof showToast === 'function') {
        showToast('error', 'Validação', 'Preencha corretamente todos os campos dos benefícios selecionados!');
    }
    
    return isValid;
}


function loadBenefitsData() {
    const savedData = localStorage.getItem('benefitsDraft');
    
    if (savedData) {
        try {
            const data = JSON.parse(savedData);
            
            if (data.beneficiosSelecionados && Array.isArray(data.beneficiosSelecionados)) {
                data.beneficiosSelecionados.forEach(beneficio => {
                    const checkbox = document.querySelector(`input[value="${beneficio}"]`);
                    if (checkbox) {
                        checkbox.checked = true;
                        checkbox.dispatchEvent(new Event('change'));
                    }
                });
            }
            
            if (data.detalhes && typeof data.detalhes === 'object') {
                Object.keys(data.detalhes).forEach(key => {
                    const field = document.querySelector(`[name="${key}"]`);
                    if (field && data.detalhes[key]) {
                        field.value = data.detalhes[key];
                    }
                });
            }
            
            setTimeout(() => {
                updateBenefitsSummary();
            }, 100);
            
            if (typeof showToast === 'function') {
                showToast('info', 'Dados Carregados', 'Rascunho de benefícios carregado!');
            }
        } catch (error) {
            console.warn('Erro ao carregar dados de benefícios:', error);
        }
    }
}

/**
 * Redireciona para a tela de Validação do Contador
 */
function redirectToValidacaoContador() {
    const currentContext = {
        page: 'dashboard',
        section: 'rh-section',
        feature: 'validacao-contador',
        company: document.querySelector('.company-name')?.textContent || 'Empresa não selecionada',
        timestamp: new Date().toISOString()
    };

    localStorage.setItem('dashboardContext', JSON.stringify(currentContext));

    const loadingOverlay = document.createElement('div');
    loadingOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #1B365D 0%, #2E5984 100%);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        color: white;
        animation: fadeIn 0.3s ease-out;
    `;

    loadingOverlay.innerHTML = `
        <div style="text-align: center;">
            <div style="
                width: 60px;
                height: 60px;
                border: 4px solid rgba(212, 175, 55, 0.3);
                border-top: 4px solid #D4AF37;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 0 auto 1.5rem auto;
            "></div>
            <h2 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 0.5rem;">
                Carregando Validação do Contador...
            </h2>
            <p style="opacity: 0.8;">Preparando ambiente de validação</p>
        </div>
    `;

    document.body.appendChild(loadingOverlay);

    setTimeout(() => {
        window.location.href = 'validacao-contador.html';
    }, 1200);
}


// ===== FUNÇÕES PLACEHOLDER PARA SOLICITAÇÕES =====

function openRescisaoForm() {
    showFeatureMessage(' Rescisão', 'rescisao');
}

function openExperienciaForm() {
    showFeatureMessage(' Experiência', 'experiencia');
}

function openValoresBeneficiosForm() {
    showFeatureMessage(' Valores de Benefícios', 'valores-beneficios');
}

function openFolhaPagamentoForm() {
    showFeatureMessage(' Folha de Pagamento', 'folha-pagamento');
}

function openDetalhesRescisaoForm() {
    showFeatureMessage(' Detalhes da Rescisão', 'detalhes-rescisao');
}

function openAlocacoesForm() {
    showFeatureMessage(' Alocações', 'alocacoes');
}

function openAlocacaoFuncionariosForm() {
    showFeatureMessage(' Alocação de Funcionários', 'alocacao-funcionarios');
}

// ===== FORMULÁRIO DE FÉRIAS =====


function openFeriasForm() {
    console.log('Abrindo formulário de férias');
    
    const targetContainer = document.getElementById('modal-container-solicitacoes') || 
                           document.getElementById('modal-container') ||
                           modalContainerSolicitacoes || 
                           modalContainer;
    
    if (!targetContainer) {
        console.error('Container de modal não encontrado!');
        if (typeof showToast === 'function') {
            showToast('error', 'Erro', 'Erro ao abrir formulário. Tente novamente.');
        }
        return;
    }
    
    const formHTML = `
        <div class="modal-overlay" id="feriasModalOverlay">
            <div class="modal-content ferias-form" onclick="event.stopPropagation()">
                <div class="modal-header">
                    <h2><i class="fas fa-umbrella-beach"></i> Solicitação de Férias</h2>
                    <button class="close-btn" id="feriasCloseBtn">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div class="auto-save-indicator">
                    <i class="fas fa-save"></i>
                    <span> Dados salvos automaticamente</span>
                    <div class="save-status" id="saveStatus">
                        <i class="fas fa-check-circle"></i>
                        <span>Salvo</span>
                    </div>
                </div>

                <div class="form-description">
                    <p><i class="fas fa-info-circle"></i> Preencha as informações para solicitação de férias do funcionário.</p>
                </div>

                <form class="ferias-form-content" id="feriasForm">
                    <div class="form-grid">
                        <div class="form-group">
                            <label for="funcionario-ferias">Funcionário </label>
                            <select id="funcionario-ferias" name="funcionario" required>
                                <option value="">Selecione o funcionário...</option>
                                <option value="joao-silva">João Silva - Analista</option>
                                <option value="maria-santos">Maria Santos - Coordenadora</option>
                                <option value="pedro-oliveira">Pedro Oliveira - Desenvolvedor</option>
                                <option value="ana-costa">Ana Costa - Designer</option>
                                <option value="carlos-ferreira">Carlos Ferreira - Gerente</option>
                                <option value="lucia-martins">Lúcia Martins - Assistente</option>
                                <option value="ricardo-alves">Ricardo Alves - Técnico</option>
                                <option value="fernanda-lima">Fernanda Lima - Analista</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="data-inicio-ferias">Data Início das Férias </label>
                            <input type="date" 
                                   id="data-inicio-ferias" 
                                   name="dataInicioFerias" 
                                   required>
                        </div>
                        
                        <div class="form-group">
                            <label for="data-fim-ferias">Data Fim das Férias </label>
                            <input type="date" 
                                   id="data-fim-ferias" 
                                   name="dataFimFerias" 
                                   required>
                        </div>
                        
                        <div class="form-group full-width">
                            <label>Solicitações </label>
                            <div class="checkbox-group">
                                <label class="checkbox-container">
                                    <input type="checkbox" name="solicitacoes[]" value="aviso-ferias" id="aviso-ferias">
                                    <span class="checkmark"></span>
                                    <span>Solicitar Aviso de Férias</span>
                                </label>
                                
                                <label class="checkbox-container">
                                    <input type="checkbox" name="solicitacoes[]" value="recibo-ferias" id="recibo-ferias">
                                    <span class="checkmark"></span>
                                    <span>Solicitar Recibo de Férias</span>
                                </label>
                            </div>
                        </div>
                        
                        <div class="form-group full-width">
                            <label for="observacoes-ferias">Observações</label>
                            <textarea id="observacoes-ferias" 
                                      name="observacoesFerias" 
                                      rows="3" 
                                      placeholder="Informações adicionais sobre as férias (opcional)"></textarea>
                        </div>
                        
                        <div class="form-group full-width ferias-info">
                            <div class="info-card">
                                <h4><i class="fas fa-calendar-alt"></i> Informações das Férias</h4>
                                <div class="ferias-details" id="feriasDetails">
                                    <p>Selecione as datas para ver os detalhes</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>

                <div class="modal-footer">
                    <button type="button" class="btn-secondary" id="feriasCancelBtn">
                        <i class="fas fa-times"></i> Cancelar
                    </button>
                    <button type="button" class="btn-primary" id="feriasSaveBtn">
                        <i class="fas fa-save"></i> Salvar Rascunho
                    </button>
                    <button type="button" class="btn-success" id="feriasSubmitBtn">
                        <i class="fas fa-paper-plane"></i> Enviar
                    </button>
                </div>
            </div>
        </div>
    `;
    
    targetContainer.innerHTML = formHTML;
    
        setTimeout(() => {
        const closeBtn = document.getElementById('feriasCloseBtn');
        if (closeBtn) {
            closeBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Botão X clicado');
                closeFeriasModal();
            });
        }
        
        const cancelBtn = document.getElementById('feriasCancelBtn');
        if (cancelBtn) {
            cancelBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Botão Cancelar clicado');
                closeFeriasModal();
            });
        }
        
        const saveBtn = document.getElementById('feriasSaveBtn');
        if (saveBtn) {
            saveBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Botão Salvar clicado');
                saveFeriasDraft();
            });
        }
        
        const submitBtn = document.getElementById('feriasSubmitBtn');
        if (submitBtn) {
            submitBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Botão Enviar clicado');
                submitFeriasData();
            });
        }
        
        const overlay = document.getElementById('feriasModalOverlay');
        if (overlay) {
            overlay.addEventListener('click', function(e) {
                if (e.target === overlay) {
                    console.log('Overlay clicado');
                    closeFeriasModal();
                }
            });
        }
        
    }, 100);
    
    if (typeof initializeFeriasForm === 'function') {
        initializeFeriasForm();
    }
    
    if (typeof startAutoSave === 'function') {
        startAutoSave();
    }
}

function closeFeriasModal() {
    console.log('Fechando modal de férias...');
    
    if (window.autoSaveInterval) {
        clearInterval(window.autoSaveInterval);
        window.autoSaveInterval = null;
    }
    
    const containers = [
        document.getElementById('modal-container'),
        document.getElementById('modal-container-solicitacoes'),
        document.getElementById('modal-container-fiscal')
    ];
    
    containers.forEach(container => {
        if (container) {
            container.innerHTML = '';
        }
    });
    
    const overlay = document.getElementById('feriasModalOverlay');
    if (overlay && overlay.parentElement) {
        overlay.parentElement.removeChild(overlay);
    }
    
    console.log('Modal de férias fechado');
}


function initializeFeriasForm() {
    console.log('Inicializando formulário de férias');
    
    try {
        loadFeriasData();
        
        setupFeriasDateEvents();
        
        setupFeriasCheckboxValidation();
        
        console.log('Formulário de férias inicializado com sucesso');
    } catch (error) {
        console.error('Erro ao inicializar formulário de férias:', error);
    }
}


function setupFeriasDateEvents() {
    const dataInicio = document.getElementById('data-inicio-ferias');
    const dataFim = document.getElementById('data-fim-ferias');
    
    if (!dataInicio || !dataFim) {
        console.error('Elementos de data não encontrados');
        return;
    }
    
    function updateFeriasInfo() {
        const inicio = dataInicio.value;
        const fim = dataFim.value;
        const detailsDiv = document.getElementById('feriasDetails');
        
        if (!detailsDiv) return;
        
        if (inicio && fim) {
            const inicioDate = new Date(inicio);
            const fimDate = new Date(fim);
            
            if (fimDate < inicioDate) {
                detailsDiv.innerHTML = `
                    <p style="color: #E74C3C;">
                        <i class="fas fa-exclamation-triangle"></i>
                        Data de fim deve ser posterior à data de início
                    </p>
                `;
                return;
            }
            
            const diffTime = Math.abs(fimDate - inicioDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
            
            const retornoDate = new Date(fimDate.getTime() + 24 * 60 * 60 * 1000);
            
            detailsDiv.innerHTML = `
                <div class="ferias-summary">
                    <div class="summary-item">
                        <strong>Período:</strong> ${formatDate(inicioDate)} a ${formatDate(fimDate)}
                    </div>
                    <div class="summary-item">
                        <strong>Duração:</strong> ${diffDays} dias
                    </div>
                    <div class="summary-item">
                        <strong>Retorno ao trabalho:</strong> ${formatDate(retornoDate)}
                    </div>
                    <div class="summary-item">
                        <strong>Funcionário:</strong> ${getFuncionarioNome()}
                    </div>
                </div>
            `;
        } else {
            detailsDiv.innerHTML = '<p>Selecione as datas para ver os detalhes</p>';
        }
    }
    
    function getFuncionarioNome() {
        const funcionarioSelect = document.getElementById('funcionario-ferias');
        if (funcionarioSelect && funcionarioSelect.value) {
            const selectedOption = funcionarioSelect.querySelector(`option[value="${funcionarioSelect.value}"]`);
            return selectedOption ? selectedOption.textContent : 'Não selecionado';
        }
        return 'Não selecionado';
    }
    
    dataInicio.addEventListener('change', updateFeriasInfo);
    dataFim.addEventListener('change', updateFeriasInfo);
    
    const funcionarioSelect = document.getElementById('funcionario-ferias');
    if (funcionarioSelect) {
        funcionarioSelect.addEventListener('change', updateFeriasInfo);
    }
    
    const today = new Date().toISOString().split('T')[0];
    dataInicio.min = today;
    dataFim.min = today;
    
    dataInicio.addEventListener('change', function() {
        dataFim.min = this.value;
        if (dataFim.value && dataFim.value < this.value) {
            dataFim.value = '';
            updateFeriasInfo();
        }
    });
}


function setupFeriasCheckboxValidation() {
    const checkboxes = document.querySelectorAll('input[name="solicitacoes[]"]');
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const checkedBoxes = document.querySelectorAll('input[name="solicitacoes[]"]:checked');
            const checkboxGroup = document.querySelector('.checkbox-group');
            
            if (checkedBoxes.length === 0) {
                if (checkboxGroup) {
                    checkboxGroup.style.borderColor = '#e74c3c';
                }
            } else {
                if (checkboxGroup) {
                    checkboxGroup.style.borderColor = '';
                }
            }
            
            if (typeof triggerAutoSave === 'function') {
                triggerAutoSave();
            }
        });
    });
}


function formatDate(date) {
    try {
        return date.toLocaleDateString('pt-BR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    } catch (error) {
        console.error('Erro ao formatar data:', error);
        return date.toLocaleDateString('pt-BR');
    }
}


function saveFeriasDraft() {
    const formData = collectFeriasData();
    
    if (formData) {
        localStorage.setItem('feriasDraft', JSON.stringify(formData));
        if (typeof showToast === 'function') {
            showToast('success', 'Rascunho', 'Solicitação de férias salva como rascunho!');
        }
        if (typeof updateSaveStatus === 'function') {
            updateSaveStatus('Rascunho salvo');
        }
    }
}


function submitFeriasData() {
    if (!validateFeriasForm()) {
        return;
    }
    
    const formData = collectFeriasData();
    
    if (typeof showToast === 'function') {
        showToast('info', 'Envio', 'Enviando solicitação de férias...');
    }
    
    setTimeout(() => {
        localStorage.removeItem('feriasDraft');
        if (typeof showToast === 'function') {
            showToast('success', 'Sucesso', 'Solicitação de férias enviada com sucesso!');
        }
        
        setTimeout(() => {
            closeFeriasModal();
        }, 1500);
    }, 2000);
}


function collectFeriasData() {
    const form = document.getElementById('feriasForm');
    if (!form) return null;
    
    const formData = new FormData(form);
    
    const data = {
        funcionario: formData.get('funcionario'),
        dataInicioFerias: formData.get('dataInicioFerias'),
        dataFimFerias: formData.get('dataFimFerias'),
        solicitacoes: formData.getAll('solicitacoes[]'),
        observacoesFerias: formData.get('observacoesFerias'),
        timestamp: new Date().toISOString()
    };
    
    return data;
}


function validateFeriasForm() {
    let isValid = true;
    
    const funcionario = document.getElementById('funcionario-ferias');
    const dataInicio = document.getElementById('data-inicio-ferias');
    const dataFim = document.getElementById('data-fim-ferias');
    const solicitacoes = document.querySelectorAll('input[name="solicitacoes[]"]:checked');
    
    [funcionario, dataInicio, dataFim].forEach(field => {
        if (field) field.style.borderColor = '';
    });
    
    const checkboxGroup = document.querySelector('.checkbox-group');
    if (checkboxGroup) {
        checkboxGroup.style.borderColor = '';
    }
    
    if (!funcionario?.value) {
        if (funcionario) funcionario.style.borderColor = '#e74c3c';
        isValid = false;
    }
    
    if (!dataInicio?.value) {
        if (dataInicio) dataInicio.style.borderColor = '#e74c3c';
        isValid = false;
    }
    
    if (!dataFim?.value) {
        if (dataFim) dataFim.style.borderColor = '#e74c3c';
        isValid = false;
    }
    
    if (solicitacoes.length === 0) {
        if (checkboxGroup) {
            checkboxGroup.style.borderColor = '#e74c3c';
        }
        if (typeof showToast === 'function') {
            showToast('warning', 'Validação', 'Selecione pelo menos uma solicitação!');
        }
        isValid = false;
    }
    
    if (dataInicio?.value && dataFim?.value) {
        const inicioDate = new Date(dataInicio.value);
        const fimDate = new Date(dataFim.value);
        
        if (fimDate < inicioDate) {
            if (dataFim) dataFim.style.borderColor = '#e74c3c';
            if (typeof showToast === 'function') {
                showToast('error', 'Validação', 'Data de fim deve ser posterior à data de início!');
            }
            isValid = false;
        }
        
        const diffTime = Math.abs(fimDate - inicioDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
        
        if (diffDays > 30) {
            if (dataFim) dataFim.style.borderColor = '#e74c3c';
            if (typeof showToast === 'function') {
                showToast('warning', 'Validação', 'Período de férias não pode exceder 30 dias!');
            }
            isValid = false;
        }
    }
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const thirtyDaysAgo = new Date(today.getTime() - (30 * 24 * 60 * 60 * 1000));
    
    if (dataInicio?.value) {
        const inicioDate = new Date(dataInicio.value);
        if (inicioDate < thirtyDaysAgo) {
            if (dataInicio) dataInicio.style.borderColor = '#e74c3c';
            if (typeof showToast === 'function') {
                showToast('error', 'Validação', 'Data de início não pode ser muito anterior (máximo 30 dias)!');
            }
            isValid = false;
        }
    }
    
    if (!isValid && typeof showToast === 'function') {
        showToast('error', 'Validação', 'Preencha todos os campos obrigatórios corretamente!');
    }
    
    return isValid;
}


function loadFeriasData() {
    const savedData = localStorage.getItem('feriasDraft');
    
    if (savedData) {
        try {
            const data = JSON.parse(savedData);
            
            if (data.funcionario) {
                const funcionarioField = document.getElementById('funcionario-ferias');
                if (funcionarioField) funcionarioField.value = data.funcionario;
            }
            
            if (data.dataInicioFerias) {
                const dataInicioField = document.getElementById('data-inicio-ferias');
                if (dataInicioField) dataInicioField.value = data.dataInicioFerias;
            }
            
            if (data.dataFimFerias) {
                const dataFimField = document.getElementById('data-fim-ferias');
                if (dataFimField) dataFimField.value = data.dataFimFerias;
            }
            
            if (data.observacoesFerias) {
                const observacoesField = document.getElementById('observacoes-ferias');
                if (observacoesField) observacoesField.value = data.observacoesFerias;
            }
            
            if (data.solicitacoes && Array.isArray(data.solicitacoes)) {
                data.solicitacoes.forEach(solicitacao => {
                    const checkbox = document.querySelector(`input[value="${solicitacao}"]`);
                    if (checkbox) {
                        checkbox.checked = true;
                    }
                });
            }
            
            setTimeout(() => {
                const dataInicioField = document.getElementById('data-inicio-ferias');
                if (dataInicioField?.value) {
                    dataInicioField.dispatchEvent(new Event('change'));
                }
            }, 100);
            
            if (typeof showToast === 'function') {
                showToast('info', 'Dados Carregados', 'Rascunho de férias carregado!');
            }
        } catch (error) {
            console.warn('Erro ao carregar dados de férias:', error);
        }
    }
}

// ===== FUNÇÕES AUXILIARES PARA AUTO-SAVE E STATUS =====

function triggerAutoSave() {
    if (document.getElementById('feriasForm')) {
        saveFeriasDraft();
    } else if (document.getElementById('contractForm')) {
        if (typeof saveContractDraft === 'function') saveContractDraft();
    } else if (document.getElementById('benefitsForm')) {
        if (typeof saveBenefitsDraft === 'function') saveBenefitsDraft();
    } else if (document.getElementById('employeeDataForm')) {
        if (typeof saveEmployeeDraft === 'function') saveEmployeeDraft();
    } else if (document.getElementById('dependentsForm')) {
        if (typeof saveDependentsDraft === 'function') saveDependentsDraft();
    }
}


function startAutoSave() {
    if (window.autoSaveInterval) {
        clearInterval(window.autoSaveInterval);
    }
    
    window.autoSaveInterval = setInterval(() => {
        triggerAutoSave();
    }, 10000); 
    
    console.log('Auto-save iniciado');
}


function updateSaveStatus(message) {
    const saveStatus = document.getElementById('saveStatus');
    if (saveStatus) {
        const statusSpan = saveStatus.querySelector('span');
        if (statusSpan) {
            statusSpan.textContent = message;
        }
        
        saveStatus.style.animation = 'pulse 0.5s ease-in-out';
        setTimeout(() => {
            if (saveStatus) {
                saveStatus.style.animation = '';
            }
        }, 500);
    }
}


if (typeof closeModal === 'undefined') {
    function closeModal() {
        console.log('Fechando modal via função global');
        
        if (window.autoSaveInterval) {
            clearInterval(window.autoSaveInterval);
            window.autoSaveInterval = null;
        }
        
        const containers = [
            document.getElementById('modal-container'),
            document.getElementById('modal-container-solicitacoes'),
            document.getElementById('modal-container-fiscal')
        ];
        
        containers.forEach(container => {
            if (container) {
                container.innerHTML = '';
            }
        });
        
        const overlays = document.querySelectorAll('.modal-overlay');
        overlays.forEach(overlay => {
            if (overlay && overlay.parentElement) {
                overlay.parentElement.removeChild(overlay);
            }
        });
        
        console.log('Modal fechado via função global');
    }
}

// ===== FORMULÁRIO DE RESCISÃO =====

function openRescisaoForm() {
    console.log('Abrindo formulário de rescisão');
    
    const targetContainer = document.getElementById('modal-container-solicitacoes') || 
                           document.getElementById('modal-container') ||
                           modalContainerSolicitacoes || 
                           modalContainer;
    
    if (!targetContainer) {
        console.error('Container de modal não encontrado!');
        if (typeof showToast === 'function') {
            showToast('error', 'Erro', 'Erro ao abrir formulário. Tente novamente.');
        }
        return;
    }
    
    const formHTML = `
        <div class="modal-overlay" id="rescisaoModalOverlay">
            <div class="modal-content rescisao-form" onclick="event.stopPropagation()">
                <div class="modal-header">
                    <h2><i class="fas fa-user-times"></i> Rescisão de Contrato</h2>
                    <button class="close-btn" id="rescisaoCloseBtn">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div class="auto-save-indicator">
                    <i class="fas fa-save"></i>
                    <span> Dados salvos automaticamente</span>
                    <div class="save-status" id="saveStatus">
                        <i class="fas fa-check-circle"></i>
                        <span>Salvo</span>
                    </div>
                </div>

                <div class="form-description">
                    <p><i class="fas fa-info-circle"></i> Preencha as informações para processar a rescisão contratual do funcionário.</p>
                </div>

                <form class="rescisao-form-content" id="rescisaoForm">
                    <div class="form-grid">
                        <div class="form-group">
                            <label for="funcionario-rescisao">Funcionário </label>
                            <select id="funcionario-rescisao" name="funcionario" required>
                                <option value="">Selecione o funcionário...</option>
                                <option value="joao-silva">João Silva - Analista</option>
                                <option value="maria-santos">Maria Santos - Coordenadora</option>
                                <option value="pedro-oliveira">Pedro Oliveira - Desenvolvedor</option>
                                <option value="ana-costa">Ana Costa - Designer</option>
                                <option value="carlos-ferreira">Carlos Ferreira - Gerente</option>
                                <option value="lucia-martins">Lúcia Martins - Assistente</option>
                                <option value="ricardo-alves">Ricardo Alves - Técnico</option>
                                <option value="fernanda-lima">Fernanda Lima - Analista</option>
                                <option value="roberto-santos">Roberto Santos - Supervisor</option>
                                <option value="patricia-costa">Patrícia Costa - Consultora</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="data-rescisao">Data da Rescisão </label>
                            <input type="date" 
                                   id="data-rescisao" 
                                   name="dataRescisao" 
                                   required>
                        </div>
                        
                        <div class="form-group">
                            <label for="categoria-rescisao">Categoria da Rescisão </label>
                            <select id="categoria-rescisao" name="categoriaRescisao" required>
                                <option value="">Selecione a categoria...</option>
                                <option value="demissao-sem-justa-causa">Demissão sem Justa Causa</option>
                                <option value="demissao-com-justa-causa">Demissão com Justa Causa</option>
                                <option value="pedido-demissao">Pedido de Demissão</option>
                                <option value="acordo-mutuo">Acordo Mútuo</option>
                                <option value="fim-contrato-determinado">Fim de Contrato por Prazo Determinado</option>
                                <option value="aposentadoria">Aposentadoria</option>
                                <option value="falecimento">Falecimento</option>
                                <option value="rescisao-indireta">Rescisão Indireta</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="tipo-aviso-previo">Tipo de Aviso Prévio </label>
                            <select id="tipo-aviso-previo" name="tipoAvisoPrevio" required>
                                <option value="">Selecione...</option>
                                <option value="trabalhado">Aviso Prévio Trabalhado</option>
                                <option value="indenizado">Aviso Prévio Indenizado</option>
                                <option value="sem-aviso">Sem Aviso Prévio</option>
                                <option value="proporcional">Aviso Prévio Proporcional</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="ultimo-dia-trabalho">Último Dia de Trabalho</label>
                            <input type="date" 
                                   id="ultimo-dia-trabalho" 
                                   name="ultimoDiaTrabalho">
                            <small>Se diferente da data de rescisão</small>
                        </div>
                        
                        <div class="form-group full-width">
                            <label for="motivo-rescisao">Motivo da Rescisão </label>
                            <textarea id="motivo-rescisao" 
                                      name="motivoRescisao" 
                                      rows="4" 
                                      placeholder="Descreva detalhadamente o motivo da rescisão (mínimo 10 caracteres)"
                                      required></textarea>
                            <small class="char-counter" id="motivoCharCounter">0/10 caracteres mínimos</small>
                        </div>
                        
                        <div class="form-group full-width">
                            <label>Direitos do Funcionário </label>
                            <div class="checkbox-group" id="direitosGroup">
                                <label class="checkbox-container">
                                    <input type="checkbox" name="direitos[]" value="saldo-salario" id="saldo-salario">
                                    <span class="checkmark"></span>
                                    <span>Saldo de Salário</span>
                                </label>
                                
                                <label class="checkbox-container">
                                    <input type="checkbox" name="direitos[]" value="ferias-vencidas" id="ferias-vencidas">
                                    <span class="checkmark"></span>
                                    <span>Férias Vencidas</span>
                                </label>
                                
                                <label class="checkbox-container">
                                    <input type="checkbox" name="direitos[]" value="ferias-proporcionais" id="ferias-proporcionais">
                                    <span class="checkmark"></span>
                                    <span>Férias Proporcionais</span>
                                </label>
                                
                                <label class="checkbox-container">
                                    <input type="checkbox" name="direitos[]" value="terco-ferias" id="terco-ferias">
                                    <span class="checkmark"></span>
                                    <span>1/3 de Férias</span>
                                </label>
                                
                                <label class="checkbox-container">
                                    <input type="checkbox" name="direitos[]" value="decimo-terceiro" id="decimo-terceiro">
                                    <span class="checkmark"></span>
                                    <span>13º Salário Proporcional</span>
                                </label>
                                
                                <label class="checkbox-container">
                                    <input type="checkbox" name="direitos[]" value="aviso-previo" id="aviso-previo">
                                    <span class="checkmark"></span>
                                    <span>Aviso Prévio</span>
                                </label>
                                
                                <label class="checkbox-container">
                                    <input type="checkbox" name="direitos[]" value="multa-fgts" id="multa-fgts">
                                    <span class="checkmark"></span>
                                    <span>Multa de 40% do FGTS</span>
                                </label>
                                
                                <label class="checkbox-container">
                                    <input type="checkbox" name="direitos[]" value="seguro-desemprego" id="seguro-desemprego">
                                    <span class="checkmark"></span>
                                    <span>Seguro Desemprego</span>
                                </label>
                            </div>
                        </div>
                        
                        <div class="form-group full-width">
                            <label for="observacoes-rescisao">Observações Adicionais</label>
                            <textarea id="observacoes-rescisao" 
                                      name="observacoesRescisao" 
                                      rows="3" 
                                      placeholder="Informações adicionais sobre a rescisão (opcional)"></textarea>
                        </div>
                        
                        <div class="form-group full-width rescisao-info">
                            <div class="info-card">
                                <h4><i class="fas fa-calculator"></i> Resumo da Rescisão</h4>
                                <div class="rescisao-details" id="rescisaoDetails">
                                    <p>Preencha os dados para ver o resumo</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>

                <div class="modal-footer">
                    <button type="button" class="btn-secondary" id="rescisaoCancelBtn">
                        <i class="fas fa-times"></i> Cancelar
                    </button>
                    <button type="button" class="btn-primary" id="rescisaoSaveBtn">
                        <i class="fas fa-save"></i> Salvar Rascunho
                    </button>
                    <button type="button" class="btn-success" id="rescisaoSubmitBtn">
                        <i class="fas fa-paper-plane"></i> Enviar
                    </button>
                </div>
            </div>
        </div>
    `;
    
    targetContainer.innerHTML = formHTML;
    
    
    setTimeout(() => {
        const closeBtn = document.getElementById('rescisaoCloseBtn');
        if (closeBtn) {
            closeBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Botão X clicado');
                closeRescisaoModal();
            });
        }
        
        const cancelBtn = document.getElementById('rescisaoCancelBtn');
        if (cancelBtn) {
            cancelBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Botão Cancelar clicado');
                closeRescisaoModal();
            });
        }
        
        const saveBtn = document.getElementById('rescisaoSaveBtn');
        if (saveBtn) {
            saveBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Botão Salvar clicado');
                saveRescisaoDraft();
            });
        }
        
        const submitBtn = document.getElementById('rescisaoSubmitBtn');
        if (submitBtn) {
            submitBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Botão Enviar clicado');
                submitRescisaoData();
            });
        }
        
        const overlay = document.getElementById('rescisaoModalOverlay');
        if (overlay) {
            overlay.addEventListener('click', function(e) {
                if (e.target === overlay) {
                    console.log('Overlay clicado');
                    closeRescisaoModal();
                }
            });
        }
        
    }, 100); 
    
    if (typeof initializeRescisaoForm === 'function') {
        initializeRescisaoForm();
    }
    
    if (typeof startAutoSave === 'function') {
        startAutoSave();
    }
}

function closeRescisaoModal() {
    console.log('Fechando modal de rescisão...');
    
    if (window.autoSaveInterval) {
        clearInterval(window.autoSaveInterval);
        window.autoSaveInterval = null;
    }
    
    const containers = [
        document.getElementById('modal-container'),
        document.getElementById('modal-container-solicitacoes'),
        document.getElementById('modal-container-fiscal')
    ];
    
    containers.forEach(container => {
        if (container) {
            container.innerHTML = '';
        }
    });
    
    const overlay = document.getElementById('rescisaoModalOverlay');
    if (overlay && overlay.parentElement) {
        overlay.parentElement.removeChild(overlay);
    }
    
    console.log('Modal de rescisão fechado');
}


function initializeRescisaoForm() {
    console.log('Inicializando formulário de rescisão');
    
    try {
        loadRescisaoData();
        
        setupRescisaoEvents();
        
        setupRescisaoCheckboxEvents();
        
        setupCharacterCounter();
        
        console.log('Formulário de rescisão inicializado com sucesso');
    } catch (error) {
        console.error('Erro ao inicializar formulário de rescisão:', error);
    }
}


function setupRescisaoEvents() {
    const funcionario = document.getElementById('funcionario-rescisao');
    const dataRescisao = document.getElementById('data-rescisao');
    const categoriaRescisao = document.getElementById('categoria-rescisao');
    const tipoAvisoPrevio = document.getElementById('tipo-aviso-previo');
    const ultimoDiaTrabalho = document.getElementById('ultimo-dia-trabalho');
    
    if (!funcionario || !dataRescisao || !categoriaRescisao || !tipoAvisoPrevio) {
        console.error('Elementos do formulário não encontrados');
        return;
    }
    
    function updateRescisaoInfo() {
        const detailsDiv = document.getElementById('rescisaoDetails');
        
        if (!detailsDiv) return;
        
        if (funcionario.value && dataRescisao.value && categoriaRescisao.value) {
            const funcionarioText = funcionario.options[funcionario.selectedIndex].text;
            const categoriaText = categoriaRescisao.options[categoriaRescisao.selectedIndex].text;
            const tipoAvisoText = tipoAvisoPrevio.value ? 
                tipoAvisoPrevio.options[tipoAvisoPrevio.selectedIndex].text : 'Não informado';
            
            const dataRescisaoFormatted = formatDateBR(new Date(dataRescisao.value));
            
            const direitosCalculados = calculateRights(categoriaRescisao.value);
            
            const prazoHomologacao = calculateHomologationDeadline(dataRescisao.value);
            
            detailsDiv.innerHTML = `
                <div class="rescisao-summary">
                    <div class="summary-item">
                        <strong>Funcionário:</strong> ${funcionarioText}
                    </div>
                    <div class="summary-item">
                        <strong>Data da Rescisão:</strong> ${dataRescisaoFormatted}
                    </div>
                    <div class="summary-item">
                        <strong>Categoria:</strong> ${categoriaText}
                    </div>
                    <div class="summary-item">
                        <strong>Tipo de Aviso:</strong> ${tipoAvisoText}
                    </div>
                    <div class="summary-item">
                        <strong>Prazo para Homologação:</strong> ${prazoHomologacao}
                    </div>
                    <div class="summary-item">
                        <strong>Direitos Sugeridos:</strong>
                        <ul class="direitos-list">
                            ${direitosCalculados.map(direito => `<li><i class="fas fa-check-circle"></i> ${direito}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            `;
            
            autoSelectRights(categoriaRescisao.value);
        } else {
            detailsDiv.innerHTML = '<p>Preencha os dados para ver o resumo</p>';
        }
    }
    
    funcionario.addEventListener('change', updateRescisaoInfo);
    dataRescisao.addEventListener('change', updateRescisaoInfo);
    categoriaRescisao.addEventListener('change', updateRescisaoInfo);
    tipoAvisoPrevio.addEventListener('change', updateRescisaoInfo);
    
    const today = new Date().toISOString().split('T')[0];
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    const oneYearAgoString = oneYearAgo.toISOString().split('T')[0];
    
    dataRescisao.min = oneYearAgoString;
    dataRescisao.max = today;
    
    dataRescisao.addEventListener('change', function() {
        if (ultimoDiaTrabalho) {
            ultimoDiaTrabalho.max = this.value;
            ultimoDiaTrabalho.min = oneYearAgoString;
            
            if (ultimoDiaTrabalho.value && ultimoDiaTrabalho.value > this.value) {
                ultimoDiaTrabalho.value = '';
            }
        }
        updateRescisaoInfo();
    });
    
    categoriaRescisao.addEventListener('change', function() {
        updateAvisoPrevioOptions(this.value);
        updateRescisaoInfo();
    });
}


function updateAvisoPrevioOptions(categoria) {
    const tipoAvisoPrevio = document.getElementById('tipo-aviso-previo');
    if (!tipoAvisoPrevio) return;
    
    tipoAvisoPrevio.value = '';
    
    const options = tipoAvisoPrevio.querySelectorAll('option');
    options.forEach(option => {
        option.disabled = false;
        option.style.display = '';
    });
    
    switch(categoria) {
        case 'demissao-com-justa-causa':
        case 'falecimento':
            const semAvisoOption = tipoAvisoPrevio.querySelector('option[value="sem-aviso"]');
            if (semAvisoOption) {
                tipoAvisoPrevio.value = 'sem-aviso';
            }
            break;
        case 'pedido-demissao':
            const trabalhadoOption = tipoAvisoPrevio.querySelector('option[value="trabalhado"]');
            if (trabalhadoOption) {
                tipoAvisoPrevio.value = 'trabalhado';
            }
            break;
        case 'fim-contrato-determinado':
            const semAvisoFimOption = tipoAvisoPrevio.querySelector('option[value="sem-aviso"]');
            if (semAvisoFimOption) {
                tipoAvisoPrevio.value = 'sem-aviso';
            }
            break;
    }
}


function calculateHomologationDeadline(dataRescisao) {
    const rescisaoDate = new Date(dataRescisao);
    const deadline = new Date(rescisaoDate);
    deadline.setDate(deadline.getDate() + 10); 
    
    return formatDateBR(deadline);
}


function setupRescisaoCheckboxEvents() {
    const checkboxes = document.querySelectorAll('input[name="direitos[]"]');
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const checkedBoxes = document.querySelectorAll('input[name="direitos[]"]:checked');
            const direitosGroup = document.getElementById('direitosGroup');
            
            if (checkedBoxes.length === 0) {
                if (direitosGroup) {
                    direitosGroup.style.borderColor = '#e74c3c';
                }
            } else {
                if (direitosGroup) {
                    direitosGroup.style.borderColor = '';
                }
            }
            
            if (typeof triggerAutoSave === 'function') {
                triggerAutoSave();
            }
        });
    });
}


function setupCharacterCounter() {
    const motivoTextarea = document.getElementById('motivo-rescisao');
    const charCounter = document.getElementById('motivoCharCounter');
    
    if (motivoTextarea && charCounter) {
        motivoTextarea.addEventListener('input', function() {
            const currentLength = this.value.length;
            const minLength = 10;
            
            charCounter.textContent = `${currentLength}/${minLength} caracteres mínimos`;
            
            if (currentLength >= minLength) {
                charCounter.style.color = '#27AE60';
                this.style.borderColor = '#27AE60';
            } else {
                charCounter.style.color = '#E74C3C';
                this.style.borderColor = '#E74C3C';
            }
        });
    }
}


function calculateRights(categoria) {
    const direitosMap = {
        'demissao-sem-justa-causa': [
            'Saldo de Salário',
            'Férias Vencidas',
            'Férias Proporcionais',
            '1/3 de Férias',
            '13º Salário Proporcional',
            'Aviso Prévio',
            'Multa de 40% do FGTS',
            'Seguro Desemprego'
        ],
        'demissao-com-justa-causa': [
            'Saldo de Salário',
            'Férias Vencidas'
        ],
        'pedido-demissao': [
            'Saldo de Salário',
            'Férias Vencidas',
            'Férias Proporcionais',
            '1/3 de Férias',
            '13º Salário Proporcional'
        ],
        'acordo-mutuo': [
            'Saldo de Salário',
            'Férias Vencidas',
            'Férias Proporcionais',
            '1/3 de Férias',
            '13º Salário Proporcional',
            'Multa de 20% do FGTS',
            'Seguro Desemprego (50%)'
        ],
        'fim-contrato-determinado': [
            'Saldo de Salário',
            'Férias Vencidas',
            'Férias Proporcionais',
            '1/3 de Férias',
            '13º Salário Proporcional'
        ],
        'aposentadoria': [
            'Saldo de Salário',
            'Férias Vencidas',
            'Férias Proporcionais',
            '1/3 de Férias',
            '13º Salário Proporcional'
        ],
        'falecimento': [
            'Saldo de Salário',
            'Férias Vencidas',
            'Férias Proporcionais',
            '1/3 de Férias',
            '13º Salário Proporcional',
            'Multa de 40% do FGTS'
        ],
        'rescisao-indireta': [
            'Saldo de Salário',
            'Férias Vencidas',
            'Férias Proporcionais',
            '1/3 de Férias',
            '13º Salário Proporcional',
            'Aviso Prévio',
            'Multa de 40% do FGTS',
            'Seguro Desemprego'
        ]
    };
    
    return direitosMap[categoria] || [];
}

function autoSelectRights(categoria) {
    const checkboxes = document.querySelectorAll('input[name="direitos[]"]');
    checkboxes.forEach(checkbox => checkbox.checked = false);
    
    const direitosMap = {
        'demissao-sem-justa-causa': ['saldo-salario', 'ferias-vencidas', 'ferias-proporcionais', 'terco-ferias', 'decimo-terceiro', 'aviso-previo', 'multa-fgts', 'seguro-desemprego'],
        'demissao-com-justa-causa': ['saldo-salario', 'ferias-vencidas'],
        'pedido-demissao': ['saldo-salario', 'ferias-vencidas', 'ferias-proporcionais', 'terco-ferias', 'decimo-terceiro'],
        'acordo-mutuo': ['saldo-salario', 'ferias-vencidas', 'ferias-proporcionais', 'terco-ferias', 'decimo-terceiro', 'seguro-desemprego'],
        'fim-contrato-determinado': ['saldo-salario', 'ferias-vencidas', 'ferias-proporcionais', 'terco-ferias', 'decimo-terceiro'],
        'aposentadoria': ['saldo-salario', 'ferias-vencidas', 'ferias-proporcionais', 'terco-ferias', 'decimo-terceiro'],
        'falecimento': ['saldo-salario', 'ferias-vencidas', 'ferias-proporcionais', 'terco-ferias', 'decimo-terceiro', 'multa-fgts'],
        'rescisao-indireta': ['saldo-salario', 'ferias-vencidas', 'ferias-proporcionais', 'terco-ferias', 'decimo-terceiro', 'aviso-previo', 'multa-fgts', 'seguro-desemprego']
    };
    
    const direitosParaSelecionar = direitosMap[categoria] || [];
    
    direitosParaSelecionar.forEach(direito => {
        const checkbox = document.getElementById(direito);
        if (checkbox) {
            checkbox.checked = true;
        }
    });
    
    const firstCheckbox = document.querySelector('input[name="direitos[]"]');
    if (firstCheckbox) {
        firstCheckbox.dispatchEvent(new Event('change'));
    }
}


function formatDateBR(date) {
    try {
        return date.toLocaleDateString('pt-BR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    } catch (error) {
        console.error('Erro ao formatar data:', error);
        return date.toLocaleDateString('pt-BR');
    }
}


function saveRescisaoDraft() {
    const formData = collectRescisaoData();
    
    if (formData) {
        localStorage.setItem('rescisaoDraft', JSON.stringify(formData));
        if (typeof showToast === 'function') {
            showToast('success', 'Rascunho', 'Dados de rescisão salvos como rascunho!');
        }
        if (typeof updateSaveStatus === 'function') {
            updateSaveStatus('Rascunho salvo');
        }
    }
}


function submitRescisaoData() {
    if (!validateRescisaoForm()) {
        return;
    }
    
    const formData = collectRescisaoData();
    
    if (typeof showToast === 'function') {
        showToast('info', 'Envio', 'Enviando dados de rescisão...');
    }
    
    setTimeout(() => {
        localStorage.removeItem('rescisaoDraft');
        if (typeof showToast === 'function') {
            showToast('success', 'Sucesso', 'Dados de rescisão enviados com sucesso!');
        }
        
        setTimeout(() => {
            closeRescisaoModal();
        }, 1500);
    }, 2000);
}


function collectRescisaoData() {
    const form = document.getElementById('rescisaoForm');
    if (!form) return null;
    
    const formData = new FormData(form);
    
    const data = {
        funcionario: formData.get('funcionario'),
        dataRescisao: formData.get('dataRescisao'),
        categoriaRescisao: formData.get('categoriaRescisao'),
        tipoAvisoPrevio: formData.get('tipoAvisoPrevio'),
        ultimoDiaTrabalho: formData.get('ultimoDiaTrabalho'),
        motivoRescisao: formData.get('motivoRescisao'),
        direitos: formData.getAll('direitos[]'),
        observacoesRescisao: formData.get('observacoesRescisao'),
        timestamp: new Date().toISOString()
    };
    
    return data;
}


function validateRescisaoForm() {
    let isValid = true;
    
    
    const funcionario = document.getElementById('funcionario-rescisao');
    const dataRescisao = document.getElementById('data-rescisao');
    const categoriaRescisao = document.getElementById('categoria-rescisao');
    const tipoAvisoPrevio = document.getElementById('tipo-aviso-previo');
    const motivoRescisao = document.getElementById('motivo-rescisao');
    const ultimoDiaTrabalho = document.getElementById('ultimo-dia-trabalho');
    
    [funcionario, dataRescisao, categoriaRescisao, tipoAvisoPrevio, motivoRescisao, ultimoDiaTrabalho].forEach(field => {
        if (field) field.style.borderColor = '';
    });
    
    const direitosGroup = document.getElementById('direitosGroup');
    if (direitosGroup) {
        direitosGroup.style.borderColor = '';
    }
    
    if (!funcionario?.value) {
        if (funcionario) funcionario.style.borderColor = '#e74c3c';
        isValid = false;
    }
    
    if (!dataRescisao?.value) {
        if (dataRescisao) dataRescisao.style.borderColor = '#e74c3c';
        isValid = false;
    }
    
    if (!categoriaRescisao?.value) {
        if (categoriaRescisao) categoriaRescisao.style.borderColor = '#e74c3c';
        isValid = false;
    }
    
    if (!tipoAvisoPrevio?.value) {
        if (tipoAvisoPrevio) tipoAvisoPrevio.style.borderColor = '#e74c3c';
        isValid = false;
    }
    
    if (!motivoRescisao?.value || motivoRescisao.value.trim().length < 10) {
        if (motivoRescisao) motivoRescisao.style.borderColor = '#e74c3c';
        if (typeof showToast === 'function') {
            showToast('error', 'Validação', 'Motivo da rescisão deve ter pelo menos 10 caracteres!');
        }
        isValid = false;
    }
    
    const direitosSelecionados = document.querySelectorAll('input[name="direitos[]"]:checked');
    if (direitosSelecionados.length === 0) {
        if (direitosGroup) {
            direitosGroup.style.borderColor = '#e74c3c';
        }
        if (typeof showToast === 'function') {
            showToast('warning', 'Validação', 'Selecione pelo menos um direito do funcionário!');
        }
        isValid = false;
    }
    
    if (ultimoDiaTrabalho?.value && dataRescisao?.value) {
        const ultimoDate = new Date(ultimoDiaTrabalho.value);
        const rescisaoDate = new Date(dataRescisao.value);
        
        if (ultimoDate > rescisaoDate) {
            if (ultimoDiaTrabalho) ultimoDiaTrabalho.style.borderColor = '#e74c3c';
            if (typeof showToast === 'function') {
                showToast('error', 'Validação', 'Último dia de trabalho não pode ser posterior à data de rescisão!');
            }
            isValid = false;
        }
    }
    
    if (dataRescisao?.value) {
        const rescisaoDate = new Date(dataRescisao.value);
        const today = new Date();
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
        
        if (rescisaoDate < oneYearAgo) {
            if (dataRescisao) dataRescisao.style.borderColor = '#e74c3c';
            if (typeof showToast === 'function') {
                showToast('error', 'Validação', 'Data de rescisão muito antiga (máximo 1 ano)!');
            }
            isValid = false;
        }
        
        if (rescisaoDate > today) {
            if (dataRescisao) dataRescisao.style.borderColor = '#e74c3c';
            if (typeof showToast === 'function') {
                showToast('error', 'Validação', 'Data de rescisão não pode ser futura!');
            }
            isValid = false;
        }
    }
    
    if (!isValid && typeof showToast === 'function') {
        showToast('error', 'Validação', 'Preencha todos os campos obrigatórios corretamente!');
    }
    
    return isValid;
}


function loadRescisaoData() {
    const savedData = localStorage.getItem('rescisaoDraft');
    
    if (savedData) {
        try {
            const data = JSON.parse(savedData);
            
            const fields = [
                { id: 'funcionario-rescisao', key: 'funcionario' },
                { id: 'data-rescisao', key: 'dataRescisao' },
                { id: 'categoria-rescisao', key: 'categoriaRescisao' },
                { id: 'tipo-aviso-previo', key: 'tipoAvisoPrevio' },
                { id: 'ultimo-dia-trabalho', key: 'ultimoDiaTrabalho' },
                { id: 'motivo-rescisao', key: 'motivoRescisao' },
                { id: 'observacoes-rescisao', key: 'observacoesRescisao' }
            ];
            
            fields.forEach(field => {
                const element = document.getElementById(field.id);
                if (element && data[field.key]) {
                    element.value = data[field.key];
                }
            });
            
            if (data.direitos && Array.isArray(data.direitos)) {
                data.direitos.forEach(direito => {
                    const checkbox = document.getElementById(direito);
                    if (checkbox) {
                        checkbox.checked = true;
                    }
                });
            }
            
            setTimeout(() => {
                const funcionarioField = document.getElementById('funcionario-rescisao');
                if (funcionarioField?.value) {
                    funcionarioField.dispatchEvent(new Event('change'));
                }
            }, 100);
            
            if (typeof showToast === 'function') {
                showToast('info', 'Dados Carregados', 'Rascunho de rescisão carregado!');
            }
        } catch (error) {
            console.warn('Erro ao carregar dados de rescisão:', error);
        }
    }
}

// ===== FORMULÁRIO DE EXPERIÊNCIA =====


function openExperienciaForm() {
    console.log('Abrindo formulário de experiência');
    
    const targetContainer = document.getElementById('modal-container-solicitacoes') || 
                           document.getElementById('modal-container') ||
                           modalContainerSolicitacoes || 
                           modalContainer;
    
    if (!targetContainer) {
        console.error('Container de modal não encontrado!');
        if (typeof showToast === 'function') {
            showToast('error', 'Erro', 'Erro ao abrir formulário. Tente novamente.');
        }
        return;
    }
    
    const formHTML = `
        <div class="modal-overlay" id="experienciaModalOverlay">
            <div class="modal-content experiencia-form" onclick="event.stopPropagation()">
                <div class="modal-header">
                    <h2><i class="fas fa-user-clock"></i> Término de Contrato de Experiência</h2>
                    <button class="close-btn" id="experienciaCloseBtn">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div class="auto-save-indicator">
                    <i class="fas fa-save"></i>
                    <span> Dados salvos automaticamente</span>
                    <div class="save-status" id="saveStatus">
                        <i class="fas fa-check-circle"></i>
                        <span>Salvo</span>
                    </div>
                </div>

                <div class="form-description">
                    <p><i class="fas fa-info-circle"></i> Preencha as informações para processar o término do contrato de experiência do funcionário.</p>
                </div>

                <form class="experiencia-form-content" id="experienciaForm">
                    <div class="form-grid">
                        <div class="form-group">
                            <label for="funcionario-experiencia">Funcionário </label>
                            <select id="funcionario-experiencia" name="funcionario" required>
                                <option value="">Selecione o funcionário...</option>
                                <option value="ana-silva">Ana Silva - Estagiária</option>
                                <option value="bruno-costa">Bruno Costa - Assistente (Experiência)</option>
                                <option value="carla-santos">Carla Santos - Analista Jr (Experiência)</option>
                                <option value="diego-oliveira">Diego Oliveira - Desenvolvedor Jr (Experiência)</option>
                                <option value="elena-ferreira">Elena Ferreira - Designer (Experiência)</option>
                                <option value="felipe-martins">Felipe Martins - Técnico (Experiência)</option>
                                <option value="gabriela-lima">Gabriela Lima - Vendedora (Experiência)</option>
                                <option value="henrique-alves">Henrique Alves - Operador (Experiência)</option>
                                <option value="isabela-rocha">Isabela Rocha - Assistente Admin (Experiência)</option>
                                <option value="joao-pereira">João Pereira - Auxiliar (Experiência)</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="data-termino">Data de Término </label>
                            <input type="date" 
                                   id="data-termino" 
                                   name="dataTermino" 
                                   required>
                        </div>
                        
                        <div class="form-group">
                            <label for="modalidade-rescisao">Modalidade da Rescisão </label>
                            <select id="modalidade-rescisao" name="modalidadeRescisao" required>
                                <option value="">Selecione...</option>
                                <option value="efetivacao">Efetivação do Funcionário</option>
                                <option value="termino-normal">Término Normal do Contrato</option>
                                <option value="demissao-sem-justa-causa">Demissão sem Justa Causa</option>
                                <option value="demissao-com-justa-causa">Demissão com Justa Causa</option>
                                <option value="pedido-demissao">Pedido de Demissão</option>
                                <option value="abandono-emprego">Abandono de Emprego</option>
                                <option value="acordo-mutuo">Acordo Mútuo</option>
                            </select>
                        </div>
                        
                        <div class="form-group full-width">
                            <label for="observacoes-experiencia">Observações sobre o Desempenho</label>
                            <textarea id="observacoes-experiencia" 
                                      name="observacoesExperiencia" 
                                      rows="4" 
                                      placeholder="Descreva o desempenho do funcionário durante o período de experiência (opcional)"></textarea>
                            <small class="char-counter" id="obsCharCounter">0 caracteres</small>
                        </div>
                        
                        <div class="form-group experiencia-details" id="experienciaDetailsContainer" style="display: none;">
                            <label for="novo-cargo">Novo Cargo (para efetivação) </label>
                            <select id="novo-cargo" name="novoCargo">
                                <option value="">Selecione o novo cargo...</option>
                                <option value="assistente">Assistente</option>
                                <option value="analista-jr">Analista Jr</option>
                                <option value="analista">Analista</option>
                                <option value="desenvolvedor-jr">Desenvolvedor Jr</option>
                                <option value="desenvolvedor">Desenvolvedor</option>
                                <option value="designer-jr">Designer Jr</option>
                                <option value="designer">Designer</option>
                                <option value="tecnico">Técnico</option>
                                <option value="vendedor">Vendedor</option>
                                <option value="operador">Operador</option>
                                <option value="auxiliar">Auxiliar</option>
                                <option value="coordenador">Coordenador</option>
                                <option value="supervisor">Supervisor</option>
                            </select>
                        </div>
                        
                        <div class="form-group experiencia-details" id="novoSalarioContainer" style="display: none;">
                            <label for="novo-salario">Novo Salário (para efetivação) </label>
                            <input type="text" 
                                   id="novo-salario" 
                                   name="novoSalario" 
                                   placeholder="R$ 0,00"
                                   class="currency-mask">
                        </div>
                        
                        <div class="form-group full-width">
                            <label>Direitos do Funcionário</label>
                            <div class="checkbox-group" id="direitosExperiencia">
                                <label class="checkbox-container">
                                    <input type="checkbox" name="direitos[]" value="saldo-salario" id="saldo-salario-exp">
                                    <span class="checkmark"></span>
                                    <span>Saldo de Salário</span>
                                </label>
                                
                                <label class="checkbox-container">
                                    <input type="checkbox" name="direitos[]" value="ferias-proporcionais" id="ferias-proporcionais-exp">
                                    <span class="checkmark"></span>
                                    <span>Férias Proporcionais</span>
                                </label>
                                
                                <label class="checkbox-container">
                                    <input type="checkbox" name="direitos[]" value="terco-ferias" id="terco-ferias-exp">
                                    <span class="checkmark"></span>
                                    <span>1/3 de Férias</span>
                                </label>
                                
                                <label class="checkbox-container">
                                    <input type="checkbox" name="direitos[]" value="decimo-terceiro" id="decimo-terceiro-exp">
                                    <span class="checkmark"></span>
                                    <span>13º Salário Proporcional</span>
                                </label>
                                
                                <label class="checkbox-container">
                                    <input type="checkbox" name="direitos[]" value="multa-fgts" id="multa-fgts-exp">
                                    <span class="checkmark"></span>
                                    <span>Multa de 40% do FGTS</span>
                                </label>
                                
                                <label class="checkbox-container">
                                    <input type="checkbox" name="direitos[]" value="seguro-desemprego" id="seguro-desemprego-exp">
                                    <span class="checkmark"></span>
                                    <span>Seguro Desemprego</span>
                                </label>
                            </div>
                        </div>
                        
                        <div class="form-group full-width experiencia-info">
                            <div class="info-card">
                                <h4><i class="fas fa-info-circle"></i> Resumo da Experiência</h4>
                                <div class="experiencia-summary" id="experienciaDetails">
                                    <p>Preencha os dados para ver o resumo</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>

                <div class="modal-footer">
                    <button type="button" class="btn-secondary" id="experienciaCancelBtn">
                        <i class="fas fa-times"></i> Cancelar
                    </button>
                    <button type="button" class="btn-primary" id="experienciaSaveBtn">
                        <i class="fas fa-save"></i> Salvar Rascunho
                    </button>
                    <button type="button" class="btn-success" id="experienciaSubmitBtn">
                        <i class="fas fa-paper-plane"></i> Enviar
                    </button>
                </div>
            </div>
        </div>
    `;
    
    targetContainer.innerHTML = formHTML;
    
    
    setTimeout(() => {
        const closeBtn = document.getElementById('experienciaCloseBtn');
        if (closeBtn) {
            closeBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Botão X clicado');
                closeExperienciaModal();
            });
        }
        
        const cancelBtn = document.getElementById('experienciaCancelBtn');
        if (cancelBtn) {
            cancelBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Botão Cancelar clicado');
                closeExperienciaModal();
            });
        }
        
        const saveBtn = document.getElementById('experienciaSaveBtn');
        if (saveBtn) {
            saveBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Botão Salvar clicado');
                saveExperienciaDraft();
            });
        }
        
        const submitBtn = document.getElementById('experienciaSubmitBtn');
        if (submitBtn) {
            submitBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Botão Enviar clicado');
                submitExperienciaData();
            });
        }
        
        const overlay = document.getElementById('experienciaModalOverlay');
        if (overlay) {
            overlay.addEventListener('click', function(e) {
                if (e.target === overlay) {
                    console.log('Overlay clicado');
                    closeExperienciaModal();
                }
            });
        }
        
    }, 100); 
    
    if (typeof initializeExperienciaForm === 'function') {
        initializeExperienciaForm();
    }
    
    if (typeof startAutoSave === 'function') {
        startAutoSave();
    }
}

function closeExperienciaModal() {
    console.log('Fechando modal de experiência...');
    
    if (window.autoSaveInterval) {
        clearInterval(window.autoSaveInterval);
        window.autoSaveInterval = null;
    }
    
    const containers = [
        document.getElementById('modal-container'),
        document.getElementById('modal-container-solicitacoes'),
        document.getElementById('modal-container-fiscal')
    ];
    
    containers.forEach(container => {
        if (container) {
            container.innerHTML = '';
        }
    });
    
    const overlay = document.getElementById('experienciaModalOverlay');
    if (overlay && overlay.parentElement) {
        overlay.parentElement.removeChild(overlay);
    }
    
    console.log('Modal de experiência fechado');
}


function initializeExperienciaForm() {
    console.log('Inicializando formulário de experiência');
    
    try {
        loadExperienciaData();
        
        setupExperienciaEvents();
        
        setupExperienciaMasks();
        
        setupExperienciaCheckboxEvents();
        
        setupExperienciaCharacterCounter();
        
        console.log('Formulário de experiência inicializado com sucesso');
    } catch (error) {
        console.error('Erro ao inicializar formulário de experiência:', error);
    }
}


function setupExperienciaEvents() {
    const funcionario = document.getElementById('funcionario-experiencia');
    const dataTermino = document.getElementById('data-termino');
    const modalidadeRescisao = document.getElementById('modalidade-rescisao');
    
    if (!funcionario || !dataTermino || !modalidadeRescisao) {
        console.error('Elementos do formulário não encontrados');
        return;
    }
    
    function updateExperienciaInfo() {
        const detailsDiv = document.getElementById('experienciaDetails');
        
        if (!detailsDiv) return;
        
        if (funcionario.value && dataTermino.value && modalidadeRescisao.value) {
            const funcionarioText = funcionario.options[funcionario.selectedIndex].text;
            const modalidadeText = modalidadeRescisao.options[modalidadeRescisao.selectedIndex].text;
            const dataTerminoFormatted = formatDateBR(new Date(dataTermino.value));
            
            const direitosCalculados = calculateExperienciaRights(modalidadeRescisao.value);
            
            const dataInicio = new Date(dataTermino.value);
            dataInicio.setDate(dataInicio.getDate() - 90);
            const duracaoAproximada = Math.ceil((new Date(dataTermino.value) - dataInicio) / (1000 * 60 * 60 * 24));
            
            const prazoHomologacao = calculateExperienciaHomologation(dataTermino.value);
            
            detailsDiv.innerHTML = `
                <div class="summary-container">
                    <div class="summary-item">
                        <strong>Funcionário:</strong> ${funcionarioText}
                    </div>
                    <div class="summary-item">
                        <strong>Data de Término:</strong> ${dataTerminoFormatted}
                    </div>
                    <div class="summary-item">
                        <strong>Modalidade:</strong> ${modalidadeText}
                    </div>
                    <div class="summary-item">
                        <strong>Duração Aproximada:</strong> ${duracaoAproximada} dias
                    </div>
                    <div class="summary-item">
                        <strong>Status:</strong> 
                        <span class="status-badge ${getStatusClass(modalidadeRescisao.value)}">
                            ${getStatusText(modalidadeRescisao.value)}
                        </span>
                    </div>
                    <div class="summary-item">
                        <strong>Prazo para Homologação:</strong> ${prazoHomologacao}
                    </div>
                    <div class="summary-item">
                        <strong>Direitos Sugeridos:</strong>
                        <ul class="direitos-list">
                            ${direitosCalculados.map(direito => `<li><i class="fas fa-check-circle"></i> ${direito}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            `;
            
            autoSelectExperienciaRights(modalidadeRescisao.value);
            
            toggleEfetivacaoFields(modalidadeRescisao.value);
        } else {
            detailsDiv.innerHTML = '<p>Preencha os dados para ver o resumo</p>';
            hideEfetivacaoFields();
        }
    }
    
    funcionario.addEventListener('change', updateExperienciaInfo);
    dataTermino.addEventListener('change', updateExperienciaInfo);
    modalidadeRescisao.addEventListener('change', updateExperienciaInfo);
    
    const today = new Date().toISOString().split('T')[0];
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 6); 
    const maxDateString = maxDate.toISOString().split('T')[0];
    
    dataTermino.min = today;
    dataTermino.max = maxDateString;
}


function calculateExperienciaHomologation(dataTermino) {
    const terminoDate = new Date(dataTermino);
    const deadline = new Date(terminoDate);
    deadline.setDate(deadline.getDate() + 10); 
    
    return formatDateBR(deadline);
}


function setupExperienciaMasks() {
    const currencyInputs = document.querySelectorAll('.currency-mask');
    currencyInputs.forEach(input => {
        if (!input.dataset.maskApplied) {
            input.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                
                if (value === '') {
                    e.target.value = '';
                    return;
                }
                
                value = parseInt(value);
                value = (value / 100).toFixed(2);
                
                value = 'R$ ' + value.replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
                e.target.value = value;
            });
            
            input.addEventListener('focus', function(e) {
                if (e.target.value === 'R$ 0,00') {
                    e.target.value = '';
                }
            });
            
            input.addEventListener('blur', function(e) {
                if (e.target.value === '' || e.target.value === 'R$ ') {
                    e.target.value = 'R$ 0,00';
                }
            });
            
            input.dataset.maskApplied = 'true';
        }
    });
}


function setupExperienciaCharacterCounter() {
    const observacoesTextarea = document.getElementById('observacoes-experiencia');
    const charCounter = document.getElementById('obsCharCounter');
    
    if (observacoesTextarea && charCounter) {
        observacoesTextarea.addEventListener('input', function() {
            const currentLength = this.value.length;
            charCounter.textContent = `${currentLength} caracteres`;
            
            if (currentLength > 500) {
                charCounter.style.color = '#E74C3C';
                charCounter.textContent = `${currentLength}/500 caracteres (máximo atingido)`;
            } else {
                charCounter.style.color = '#7F8C8D';
            }
        });
    }
}


function setupExperienciaCheckboxEvents() {
    const checkboxes = document.querySelectorAll('input[name="direitos[]"]');
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const modalidade = document.getElementById('modalidade-rescisao').value;
            
            if (modalidade !== 'efetivacao') {
                const checkedBoxes = document.querySelectorAll('input[name="direitos[]"]:checked');
                const direitosGroup = document.getElementById('direitosExperiencia');
                
                if (checkedBoxes.length === 0) {
                    if (direitosGroup) {
                        direitosGroup.style.borderColor = '#e74c3c';
                    }
                } else {
                    if (direitosGroup) {
                        direitosGroup.style.borderColor = '';
                    }
                }
            }
            
            if (typeof triggerAutoSave === 'function') {
                triggerAutoSave();
            }
        });
    });
}


function toggleEfetivacaoFields(modalidade) {
    const novoCargo = document.getElementById('experienciaDetailsContainer');
    const novoSalario = document.getElementById('novoSalarioContainer');
    const novoCargoField = document.getElementById('novo-cargo');
    const novoSalarioField = document.getElementById('novo-salario');
    
    if (modalidade === 'efetivacao') {
        if (novoCargo) {
            novoCargo.style.display = 'block';
            novoCargo.style.animation = 'fadeInDown 0.3s ease-out';
        }
        if (novoSalario) {
            novoSalario.style.display = 'block';
            novoSalario.style.animation = 'fadeInDown 0.3s ease-out';
        }
        
        if (novoCargoField) novoCargoField.required = true;
        if (novoSalarioField) novoSalarioField.required = true;
        
        const checkboxes = document.querySelectorAll('input[name="direitos[]"]');
        checkboxes.forEach(checkbox => checkbox.checked = false);
        
        const direitosGroup = document.getElementById('direitosExperiencia');
        if (direitosGroup) {
            direitosGroup.style.display = 'none';
        }
    } else {
        hideEfetivacaoFields();
        
        const direitosGroup = document.getElementById('direitosExperiencia');
        if (direitosGroup) {
            direitosGroup.style.display = 'block';
        }
    }
}


function hideEfetivacaoFields() {
    const novoCargo = document.getElementById('experienciaDetailsContainer');
    const novoSalario = document.getElementById('novoSalarioContainer');
    const novoCargoField = document.getElementById('novo-cargo');
    const novoSalarioField = document.getElementById('novo-salario');
    
    if (novoCargo) novoCargo.style.display = 'none';
    if (novoSalario) novoSalario.style.display = 'none';
    
    if (novoCargoField) {
        novoCargoField.required = false;
        novoCargoField.value = '';
        novoCargoField.style.borderColor = '';
    }
    if (novoSalarioField) {
        novoSalarioField.required = false;
        novoSalarioField.value = '';
        novoSalarioField.style.borderColor = '';
    }
}


function calculateExperienciaRights(modalidade) {
    const direitosMap = {
        'efetivacao': [
            'Continuidade do Contrato',
            'Novo Salário Definido',
            'Estabilidade Adquirida'
        ],
        'termino-normal': [
            'Saldo de Salário',
            'Férias Proporcionais',
            '1/3 de Férias',
            '13º Salário Proporcional'
        ],
        'demissao-sem-justa-causa': [
            'Saldo de Salário',
            'Férias Proporcionais',
            '1/3 de Férias',
            '13º Salário Proporcional',
            'Multa de 40% do FGTS',
            'Seguro Desemprego'
        ],
        'demissao-com-justa-causa': [
            'Saldo de Salário'
        ],
        'pedido-demissao': [
            'Saldo de Salário',
            'Férias Proporcionais',
            '1/3 de Férias',
            '13º Salário Proporcional'
        ],
        'abandono-emprego': [
            'Saldo de Salário (se houver)'
        ],
        'acordo-mutuo': [
            'Saldo de Salário',
            'Férias Proporcionais',
            '1/3 de Férias',
            '13º Salário Proporcional',
            'Multa de 20% do FGTS'
        ]
    };
    
    return direitosMap[modalidade] || [];
}


function autoSelectExperienciaRights(modalidade) {
    const checkboxes = document.querySelectorAll('input[name="direitos[]"]');
    checkboxes.forEach(checkbox => checkbox.checked = false);
    
    if (modalidade === 'efetivacao') {
        return;
    }
    
    const direitosMap = {
        'termino-normal': ['saldo-salario', 'ferias-proporcionais', 'terco-ferias', 'decimo-terceiro'],
        'demissao-sem-justa-causa': ['saldo-salario', 'ferias-proporcionais', 'terco-ferias', 'decimo-terceiro', 'multa-fgts', 'seguro-desemprego'],
        'demissao-com-justa-causa': ['saldo-salario'],
        'pedido-demissao': ['saldo-salario', 'ferias-proporcionais', 'terco-ferias', 'decimo-terceiro'],
        'acordo-mutuo': ['saldo-salario', 'ferias-proporcionais', 'terco-ferias', 'decimo-terceiro']
    };
    
    const direitosParaSelecionar = direitosMap[modalidade] || [];
    
    direitosParaSelecionar.forEach(direito => {
        const checkbox = document.getElementById(`${direito}-exp`);
        if (checkbox) {
            checkbox.checked = true;
        }
    });
    
    const firstCheckbox = document.querySelector('input[name="direitos[]"]');
    if (firstCheckbox) {
        firstCheckbox.dispatchEvent(new Event('change'));
    }
}


function getStatusClass(modalidade) {
    const statusMap = {
        'efetivacao': 'success',
        'termino-normal': 'info',
        'demissao-sem-justa-causa': 'warning',
        'demissao-com-justa-causa': 'error',
        'pedido-demissao': 'info',
        'abandono-emprego': 'error',
        'acordo-mutuo': 'warning'
    };
    
    return statusMap[modalidade] || 'info';
}


function getStatusText(modalidade) {
    const statusMap = {
        'efetivacao': 'Efetivado',
        'termino-normal': 'Término Normal',
        'demissao-sem-justa-causa': 'Demitido',
        'demissao-com-justa-causa': 'Justa Causa',
        'pedido-demissao': 'Pediu Demissão',
        'abandono-emprego': 'Abandono',
        'acordo-mutuo': 'Acordo Mútuo'
    };
    
    return statusMap[modalidade] || 'Indefinido';
}


function formatDateBR(date) {
    try {
        return date.toLocaleDateString('pt-BR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    } catch (error) {
        console.error('Erro ao formatar data:', error);
        return date.toLocaleDateString('pt-BR');
    }
}


function saveExperienciaDraft() {
    const formData = collectExperienciaData();
    
    if (formData) {
        localStorage.setItem('experienciaDraft', JSON.stringify(formData));
        if (typeof showToast === 'function') {
            showToast('success', 'Rascunho', 'Dados de experiência salvos como rascunho!');
        }
        if (typeof updateSaveStatus === 'function') {
            updateSaveStatus('Rascunho salvo');
        }
    }
}


function submitExperienciaData() {
    if (!validateExperienciaForm()) {
        return;
    }
    
    const formData = collectExperienciaData();
    
    if (typeof showToast === 'function') {
        showToast('info', 'Envio', 'Enviando dados de experiência...');
    }
    
    setTimeout(() => {
        localStorage.removeItem('experienciaDraft');
        if (typeof showToast === 'function') {
            showToast('success', 'Sucesso', 'Dados de experiência enviados com sucesso!');
        }
        
        setTimeout(() => {
            closeExperienciaModal();
        }, 1500);
    }, 2000);
}


function collectExperienciaData() {
    const form = document.getElementById('experienciaForm');
    if (!form) return null;
    
    const formData = new FormData(form);
    
    const data = {
        funcionario: formData.get('funcionario'),
        dataTermino: formData.get('dataTermino'),
        modalidadeRescisao: formData.get('modalidadeRescisao'),
        observacoesExperiencia: formData.get('observacoesExperiencia'),
        novoCargo: formData.get('novoCargo'),
        novoSalario: formData.get('novoSalario'),
        direitos: formData.getAll('direitos[]'),
        timestamp: new Date().toISOString()
    };
    
    return data;
}


function validateExperienciaForm() {
    let isValid = true;
    
    const funcionario = document.getElementById('funcionario-experiencia');
    const dataTermino = document.getElementById('data-termino');
    const modalidadeRescisao = document.getElementById('modalidade-rescisao');
    const observacoes = document.getElementById('observacoes-experiencia');
    
    [funcionario, dataTermino, modalidadeRescisao].forEach(field => {
        if (field) field.style.borderColor = '';
    });
    
    const direitosGroup = document.getElementById('direitosExperiencia');
    if (direitosGroup) {
        direitosGroup.style.borderColor = '';
    }
    
    if (!funcionario?.value) {
        if (funcionario) funcionario.style.borderColor = '#e74c3c';
        isValid = false;
    }
    
    if (!dataTermino?.value) {
        if (dataTermino) dataTermino.style.borderColor = '#e74c3c';
        isValid = false;
    }
    
    if (!modalidadeRescisao?.value) {
        if (modalidadeRescisao) modalidadeRescisao.style.borderColor = '#e74c3c';
        isValid = false;
    }
    
    if (modalidadeRescisao?.value === 'efetivacao') {
        const novoCargo = document.getElementById('novo-cargo');
        const novoSalario = document.getElementById('novo-salario');
        
        if (!novoCargo?.value) {
            if (novoCargo) novoCargo.style.borderColor = '#e74c3c';
            if (typeof showToast === 'function') {
                showToast('error', 'Validação', 'Novo cargo é obrigatório para efetivação!');
            }
            isValid = false;
        }
        
        if (!novoSalario?.value || novoSalario.value === 'R$ 0,00') {
            if (novoSalario) novoSalario.style.borderColor = '#e74c3c';
            if (typeof showToast === 'function') {
                showToast('error', 'Validação', 'Novo salário é obrigatório para efetivação!');
            }
            isValid = false;
        } else {
            const valorText = novoSalario.value.replace(/[^\d,]/g, '').replace(',', '.');
            const valor = parseFloat(valorText);
            
            if (isNaN(valor) || valor < 1320) {
                if (novoSalario) novoSalario.style.borderColor = '#e74c3c';
                if (typeof showToast === 'function') {
                    showToast('error', 'Validação', 'Novo salário deve ser igual ou superior ao salário mínimo!');
                }
                isValid = false;
            }
        }
    } else {
        const direitosSelecionados = document.querySelectorAll('input[name="direitos[]"]:checked');
        
        if (direitosSelecionados.length === 0) {
            if (direitosGroup) {
                direitosGroup.style.borderColor = '#e74c3c';
            }
            if (typeof showToast === 'function') {
                showToast('warning', 'Validação', 'Selecione pelo menos um direito do funcionário!');
            }
            isValid = false;
        }
    }
    
    if (observacoes?.value && observacoes.value.length > 500) {
        if (observacoes) observacoes.style.borderColor = '#e74c3c';
        if (typeof showToast === 'function') {
            showToast('error', 'Validação', 'Observações não podem exceder 500 caracteres!');
        }
        isValid = false;
    }
    
    if (dataTermino?.value) {
        const terminoDate = new Date(dataTermino.value);
        const today = new Date();
        const maxDate = new Date();
        maxDate.setMonth(maxDate.getMonth() + 6);
        
        if (terminoDate > maxDate) {
            if (dataTermino) dataTermino.style.borderColor = '#e74c3c';
            if (typeof showToast === 'function') {
                showToast('warning', 'Validação', 'Data de término muito distante (máximo 6 meses)!');
            }
            isValid = false;
        }
        
        if (terminoDate < today) {
            const diffDays = Math.ceil((today - terminoDate) / (1000 * 60 * 60 * 24));
            if (diffDays > 30) { 
                if (dataTermino) dataTermino.style.borderColor = '#e74c3c';
                if (typeof showToast === 'function') {
                    showToast('error', 'Validação', 'Data de término muito antiga (máximo 30 dias)!');
                }
                isValid = false;
            }
        }
    }
    
    if (!isValid && typeof showToast === 'function') {
        showToast('error', 'Validação', 'Preencha todos os campos obrigatórios corretamente!');
    }
    
    return isValid;
}


function loadExperienciaData() {
    const savedData = localStorage.getItem('experienciaDraft');
    
    if (savedData) {
        try {
            const data = JSON.parse(savedData);
            
            const fields = [
                { id: 'funcionario-experiencia', key: 'funcionario' },
                { id: 'data-termino', key: 'dataTermino' },
                { id: 'modalidade-rescisao', key: 'modalidadeRescisao' },
                { id: 'observacoes-experiencia', key: 'observacoesExperiencia' },
                { id: 'novo-cargo', key: 'novoCargo' },
                { id: 'novo-salario', key: 'novoSalario' }
            ];
            
            fields.forEach(field => {
                const element = document.getElementById(field.id);
                if (element && data[field.key]) {
                    element.value = data[field.key];
                }
            });
            
            if (data.direitos && Array.isArray(data.direitos)) {
                data.direitos.forEach(direito => {
                    const checkbox = document.getElementById(`${direito}-exp`);
                    if (checkbox) {
                        checkbox.checked = true;
                    }
                });
            }
            
            setTimeout(() => {
                const funcionarioField = document.getElementById('funcionario-experiencia');
                if (funcionarioField?.value) {
                    funcionarioField.dispatchEvent(new Event('change'));
                }
            }, 100);
            
            if (typeof showToast === 'function') {
                showToast('info', 'Dados Carregados', 'Rascunho de experiência carregado!');
            }
        } catch (error) {
            console.warn('Erro ao carregar dados de experiência:', error);
        }
    }
}

// ===== FORMULÁRIO DE VALORES DE BENEFÍCIOS =====


function openValoresBeneficiosForm() {
    console.log('Abrindo formulário de valores de benefícios');
    
    const targetContainer = document.getElementById('modal-container-solicitacoes') || 
                           document.getElementById('modal-container') ||
                           modalContainerSolicitacoes || 
                           modalContainer;
    
    if (!targetContainer) {
        console.error('Container de modal não encontrado!');
        if (typeof showToast === 'function') {
            showToast('error', 'Erro', 'Erro ao abrir formulário. Tente novamente.');
        }
        return;
    }
    
    const formHTML = `
        <div class="modal-overlay" id="valoresBeneficiosModalOverlay">
            <div class="modal-content valores-beneficios-form" onclick="event.stopPropagation()">
                <div class="modal-header">
                    <h2><i class="fas fa-dollar-sign"></i> Valores de Benefícios</h2>
                    <button class="close-btn" id="valoresBeneficiosCloseBtn">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div class="auto-save-indicator">
                    <i class="fas fa-save"></i>
                    <span> Dados salvos automaticamente</span>
                    <div class="save-status" id="saveStatus">
                        <i class="fas fa-check-circle"></i>
                        <span>Salvo</span>
                    </div>
                </div>

                <div class="form-description">
                    <p><i class="fas fa-info-circle"></i> Configure os valores dos benefícios oferecidos pela empresa aos funcionários.</p>
                </div>

                <form class="valores-beneficios-form-content" id="valoresBeneficiosForm">
                    <div class="beneficios-valores-grid">
                        <!-- Cesta Básica -->
                        <div class="beneficio-valor-card">
                            <div class="beneficio-header">
                                <i class="fas fa-shopping-basket"></i>
                                <h4>Cesta Básica</h4>
                            </div>
                            <div class="beneficio-inputs">
                                <label for="valor-cesta-basica">Valor Cesta Básica</label>
                                <input type="text" 
                                       id="valor-cesta-basica" 
                                       name="valorCestaBasica" 
                                       placeholder="0,00"
                                       class="currency-mask"
                                       value="R$ 0,00">
                                <small>Valor mensal fornecido ao funcionário</small>
                            </div>
                        </div>

                        <!-- Vale Transporte -->
                        <div class="beneficio-valor-card">
                            <div class="beneficio-header">
                                <i class="fas fa-bus"></i>
                                <h4>Vale Transporte</h4>
                            </div>
                            <div class="beneficio-inputs">
                                <label for="valor-vale-transporte">Valor Vale Transporte</label>
                                <input type="text" 
                                       id="valor-vale-transporte" 
                                       name="valorValeTransporte" 
                                       placeholder="0,00"
                                       class="currency-mask"
                                       value="R$ 0,00">
                                <small>Valor diário do vale transporte</small>
                            </div>
                        </div>

                        <!-- VR/VA -->
                        <div class="beneficio-valor-card">
                            <div class="beneficio-header">
                                <i class="fas fa-utensils"></i>
                                <h4>VR/VA</h4>
                            </div>
                            <div class="beneficio-inputs">
                                <label for="valor-vr-va">Valor VR/VA</label>
                                <input type="text" 
                                       id="valor-vr-va" 
                                       name="valorVrVa" 
                                       placeholder="0,00"
                                       class="currency-mask"
                                       value="R$ 0,00">
                                <small>Valor diário de Vale Refeição/Alimentação</small>
                            </div>
                        </div>

                        <!-- Plano de Saúde -->
                        <div class="beneficio-valor-card">
                            <div class="beneficio-header">
                                <i class="fas fa-heart"></i>
                                <h4>Plano de Saúde</h4>
                            </div>
                            <div class="beneficio-inputs">
                                <label for="valor-plano-saude">Valor Plano de Saúde</label>
                                <input type="text" 
                                       id="valor-plano-saude" 
                                       name="valorPlanoSaude" 
                                       placeholder="0,00"
                                       class="currency-mask"
                                       value="R$ 0,00">
                                <small>Valor mensal do plano de saúde</small>
                            </div>
                        </div>

                        <!-- Plano Odontológico -->
                        <div class="beneficio-valor-card">
                            <div class="beneficio-header">
                                <i class="fas fa-tooth"></i>
                                <h4>Plano Odontológico</h4>
                            </div>
                            <div class="beneficio-inputs">
                                <label for="valor-plano-odonto">Valor Plano Odontológico</label>
                                <input type="text" 
                                       id="valor-plano-odonto" 
                                       name="valorPlanoOdonto" 
                                       placeholder="0,00"
                                       class="currency-mask"
                                       value="R$ 0,00">
                                <small>Valor mensal do plano odontológico</small>
                            </div>
                        </div>

                        <!-- Seguro de Vida -->
                        <div class="beneficio-valor-card">
                            <div class="beneficio-header">
                                <i class="fas fa-shield-alt"></i>
                                <h4>Seguro de Vida</h4>
                            </div>
                            <div class="beneficio-inputs">
                                <label for="valor-seguro-vida">Valor Seguro de Vida</label>
                                <input type="text" 
                                       id="valor-seguro-vida" 
                                       name="valorSeguroVida" 
                                       placeholder="0,00"
                                       class="currency-mask"
                                       value="R$ 0,00">
                                <small>Valor mensal do seguro de vida</small>
                            </div>
                        </div>

                        <!-- Auxílio Educação -->
                        <div class="beneficio-valor-card">
                            <div class="beneficio-header">
                                <i class="fas fa-graduation-cap"></i>
                                <h4>Auxílio Educação</h4>
                            </div>
                            <div class="beneficio-inputs">
                                <label for="valor-auxilio-educacao">Valor Auxílio Educação</label>
                                <input type="text" 
                                       id="valor-auxilio-educacao" 
                                       name="valorAuxilioEducacao" 
                                       placeholder="0,00"
                                       class="currency-mask"
                                       value="R$ 0,00">
                                <small>Valor máximo mensal para educação</small>
                            </div>
                        </div>

                        <!-- Gympass -->
                        <div class="beneficio-valor-card">
                            <div class="beneficio-header">
                                <i class="fas fa-dumbbell"></i>
                                <h4>Gympass/Academia</h4>
                            </div>
                            <div class="beneficio-inputs">
                                <label for="valor-gympass">Valor Gympass</label>
                                <input type="text" 
                                       id="valor-gympass" 
                                       name="valorGympass" 
                                       placeholder="0,00"
                                       class="currency-mask"
                                       value="R$ 0,00">
                                <small>Valor mensal do benefício fitness</small>
                            </div>
                        </div>
                    </div>
                    
                    <div class="observacoes-section">
                        <div class="form-group full-width">
                            <label for="observacoes-beneficios">Observações</label>
                            <textarea id="observacoes-beneficios" 
                                      name="observacoesBeneficios" 
                                      rows="4" 
                                      placeholder="Informações adicionais sobre os benefícios"></textarea>
                            <small>Informações sobre critérios, elegibilidade, descontos, etc.</small>
                        </div>
                    </div>
                    
                    <div class="resumo-valores">
                        <div class="info-card">
                            <h4><i class="fas fa-calculator"></i> Resumo dos Valores</h4>
                            <div class="valores-summary" id="valoresSummary">
                                <div class="summary-grid">
                                    <div class="summary-item">
                                        <strong>Total Mensal por Funcionário:</strong>
                                        <span class="total-mensal" id="totalMensal">R$ 0,00</span>
                                    </div>
                                    <div class="summary-item">
                                        <strong>Total Diário por Funcionário:</strong>
                                        <span class="total-diario" id="totalDiario">R$ 0,00</span>
                                    </div>
                                    <div class="summary-item">
                                        <strong>Total Anual por Funcionário:</strong>
                                        <span class="total-anual" id="totalAnual">R$ 0,00</span>
                                    </div>
                                </div>
                                <div class="beneficios-ativos" id="beneficiosAtivos">
                                    <h5>Benefícios Configurados:</h5>
                                    <ul id="listaBeneficiosAtivos">
                                        <li>Nenhum benefício configurado</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>

                <div class="modal-footer">
                    <button type="button" class="btn-secondary" id="valoresBeneficiosCancelBtn">
                        <i class="fas fa-times"></i> Cancelar
                    </button>
                    <button type="button" class="btn-primary" id="valoresBeneficiosSaveBtn">
                        <i class="fas fa-save"></i> Salvar Rascunho
                    </button>
                    <button type="button" class="btn-success" id="valoresBeneficiosSubmitBtn">
                        <i class="fas fa-paper-plane"></i> Enviar
                    </button>
                </div>
            </div>
        </div>
    `;
    
    targetContainer.innerHTML = formHTML;
    
    
    setTimeout(() => {
        const closeBtn = document.getElementById('valoresBeneficiosCloseBtn');
        if (closeBtn) {
            closeBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Botão X clicado');
                closeValoresBeneficiosModal();
            });
        }
        
        const cancelBtn = document.getElementById('valoresBeneficiosCancelBtn');
        if (cancelBtn) {
            cancelBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Botão Cancelar clicado');
                closeValoresBeneficiosModal();
            });
        }
        
        const saveBtn = document.getElementById('valoresBeneficiosSaveBtn');
        if (saveBtn) {
            saveBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Botão Salvar clicado');
                saveValoresBeneficiosDraft();
            });
        }
        
        const submitBtn = document.getElementById('valoresBeneficiosSubmitBtn');
        if (submitBtn) {
            submitBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Botão Enviar clicado');
                submitValoresBeneficiosData();
            });
        }
        
        const overlay = document.getElementById('valoresBeneficiosModalOverlay');
        if (overlay) {
            overlay.addEventListener('click', function(e) {
                if (e.target === overlay) {
                    console.log('Overlay clicado');
                    closeValoresBeneficiosModal();
                }
            });
        }
        
    }, 100); 
    
    if (typeof initializeValoresBeneficiosForm === 'function') {
        initializeValoresBeneficiosForm();
    }
    
    if (typeof startAutoSave === 'function') {
        startAutoSave();
    }
}

function closeValoresBeneficiosModal() {
    console.log('Fechando modal de valores de benefícios...');
    
    if (window.autoSaveInterval) {
        clearInterval(window.autoSaveInterval);
        window.autoSaveInterval = null;
    }
    
    const containers = [
        document.getElementById('modal-container'),
        document.getElementById('modal-container-solicitacoes'),
        document.getElementById('modal-container-fiscal')
    ];
    
    containers.forEach(container => {
        if (container) {
            container.innerHTML = '';
        }
    });
    
    const overlay = document.getElementById('valoresBeneficiosModalOverlay');
    if (overlay && overlay.parentElement) {
        overlay.parentElement.removeChild(overlay);
    }
    
    console.log('Modal de valores de benefícios fechado');
}


function initializeValoresBeneficiosForm() {
    console.log('Inicializando formulário de valores de benefícios');
    
    try {
        loadValoresBeneficiosData();
        
        setupValoresBeneficiosMasks();
        
        setupValoresBeneficiosEvents();
        
        calculateTotals();
        
        console.log('Formulário de valores de benefícios inicializado com sucesso');
    } catch (error) {
        console.error('Erro ao inicializar formulário de valores de benefícios:', error);
    }
}


function setupValoresBeneficiosMasks() {
    const currencyInputs = document.querySelectorAll('.currency-mask');
    currencyInputs.forEach(input => {
        if (!input.dataset.maskApplied) {
            input.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                
                if (value === '') {
                    e.target.value = '';
                    return;
                }
                
                value = parseInt(value);
                value = (value / 100).toFixed(2);
                
                value = 'R$ ' + value.replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
                e.target.value = value;
                
                calculateTotals();
                if (typeof triggerAutoSave === 'function') {
                    triggerAutoSave();
                }
            });
            
            input.addEventListener('focus', function(e) {
                if (e.target.value === 'R$ 0,00') {
                    e.target.value = '';
                }
            });
            
            input.addEventListener('blur', function(e) {
                if (e.target.value === '' || e.target.value === 'R$ ') {
                    e.target.value = 'R$ 0,00';
                }
                calculateTotals();
            });
            
            input.dataset.maskApplied = 'true';
        }
    });
}


function setupValoresBeneficiosEvents() {
    const observacoes = document.getElementById('observacoes-beneficios');
    
    if (observacoes) {
        observacoes.addEventListener('input', function() {
            if (typeof triggerAutoSave === 'function') {
                triggerAutoSave();
            }
        });
    }
    
    const currencyInputs = document.querySelectorAll('.currency-mask');
    currencyInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateFieldValue(this);
        });
    });
}


function validateFieldValue(field) {
    const valor = getNumericValue(field.id);
    const limites = {
        'valor-cesta-basica': { max: 1000, nome: 'Cesta Básica' },
        'valor-vale-transporte': { max: 50, nome: 'Vale Transporte' },
        'valor-vr-va': { max: 100, nome: 'VR/VA' },
        'valor-plano-saude': { max: 2000, nome: 'Plano de Saúde' },
        'valor-plano-odonto': { max: 200, nome: 'Plano Odontológico' },
        'valor-seguro-vida': { max: 500, nome: 'Seguro de Vida' },
        'valor-auxilio-educacao': { max: 3000, nome: 'Auxílio Educação' },
        'valor-gympass': { max: 300, nome: 'Gympass' }
    };
    
    const limite = limites[field.id];
    if (limite && valor > limite.max) {
        field.style.borderColor = '#f39c12';
        field.title = `Valor muito alto para ${limite.nome}. Máximo sugerido: ${formatCurrency(limite.max)}`;
    } else {
        field.style.borderColor = '';
        field.title = '';
    }
}


function calculateTotals() {
    try {
        const valores = {
            cestaBasica: getNumericValue('valor-cesta-basica') || 0,
            valeTransporte: getNumericValue('valor-vale-transporte') || 0,
            vrVa: getNumericValue('valor-vr-va') || 0,
            planoSaude: getNumericValue('valor-plano-saude') || 0,
            planoOdonto: getNumericValue('valor-plano-odonto') || 0,
            seguroVida: getNumericValue('valor-seguro-vida') || 0,
            auxilioEducacao: getNumericValue('valor-auxilio-educacao') || 0,
            gympass: getNumericValue('valor-gympass') || 0
        };
        
        const totalMensal = valores.cestaBasica + valores.planoSaude + valores.planoOdonto + 
                           valores.seguroVida + valores.auxilioEducacao + valores.gympass;
        
        const totalDiario = valores.valeTransporte + valores.vrVa;
        
        const totalMensalCompleto = totalMensal + (totalDiario * 22); 
        const totalAnual = totalMensalCompleto * 12;
        
        const totalMensalElement = document.getElementById('totalMensal');
        const totalDiarioElement = document.getElementById('totalDiario');
        const totalAnualElement = document.getElementById('totalAnual');
        
        if (totalMensalElement) totalMensalElement.textContent = formatCurrency(totalMensalCompleto);
        if (totalDiarioElement) totalDiarioElement.textContent = formatCurrency(totalDiario);
        if (totalAnualElement) totalAnualElement.textContent = formatCurrency(totalAnual);
        
        updateBeneficiosAtivos(valores);
        
        updateCostIndicators(totalMensalCompleto, totalAnual);
        
    } catch (error) {
        console.error('Erro ao calcular totais:', error);
    }
}


function updateCostIndicators(totalMensal, totalAnual) {
    const totalMensalElement = document.getElementById('totalMensal');
    const totalAnualElement = document.getElementById('totalAnual');
    
    [totalMensalElement, totalAnualElement].forEach(element => {
        if (element) {
            element.classList.remove('cost-low', 'cost-medium', 'cost-high');
        }
    });
    
    let costClass = 'cost-low';
    if (totalMensal > 1000) {
        costClass = 'cost-medium';
    }
    if (totalMensal > 2000) {
        costClass = 'cost-high';
    }
    
    if (totalMensalElement) totalMensalElement.classList.add(costClass);
    if (totalAnualElement) totalAnualElement.classList.add(costClass);
}


function getNumericValue(fieldId) {
    const field = document.getElementById(fieldId);
    if (!field || !field.value) return 0;
    
    try {
        const value = field.value.replace(/[^\d,]/g, '').replace(',', '.');
        const numericValue = parseFloat(value);
        return isNaN(numericValue) ? 0 : numericValue;
    } catch (error) {
        console.error('Erro ao extrair valor numérico:', error);
        return 0;
    }
}


function formatCurrency(value) {
    try {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value || 0);
    } catch (error) {
        console.error('Erro ao formatar moeda:', error);
        return 'R$ 0,00';
    }
}


function updateBeneficiosAtivos(valores) {
    const lista = document.getElementById('listaBeneficiosAtivos');
    if (!lista) return;
    
    const beneficiosAtivos = [];
    
    const beneficiosMap = {
        cestaBasica: { nome: 'Cesta Básica', tipo: 'mensal' },
        valeTransporte: { nome: 'Vale Transporte', tipo: 'diário' },
        vrVa: { nome: 'VR/VA', tipo: 'diário' },
        planoSaude: { nome: 'Plano de Saúde', tipo: 'mensal' },
        planoOdonto: { nome: 'Plano Odontológico', tipo: 'mensal' },
        seguroVida: { nome: 'Seguro de Vida', tipo: 'mensal' },
        auxilioEducacao: { nome: 'Auxílio Educação', tipo: 'mensal' },
        gympass: { nome: 'Gympass/Academia', tipo: 'mensal' }
    };
    
    Object.keys(valores).forEach(key => {
        if (valores[key] > 0) {
            const beneficio = beneficiosMap[key];
            const valorFormatado = formatCurrency(valores[key]);
            const frequencia = beneficio.tipo === 'diário' ? '/dia' : '/mês';
            
            beneficiosAtivos.push({
                nome: beneficio.nome,
                valor: valorFormatado,
                frequencia: frequencia,
                tipo: beneficio.tipo
            });
        }
    });
    
    if (beneficiosAtivos.length === 0) {
        lista.innerHTML = '<li class="no-benefits">Nenhum benefício configurado</li>';
    } else {
        const beneficiosHTML = beneficiosAtivos.map(beneficio => `
            <li class="benefit-item ${beneficio.tipo}">
                <i class="fas fa-check-circle"></i> 
                <span class="benefit-name">${beneficio.nome}:</span> 
                <span class="benefit-value">${beneficio.valor}${beneficio.frequencia}</span>
            </li>
        `).join('');
        
        lista.innerHTML = beneficiosHTML;
    }
}


function saveValoresBeneficiosDraft() {
    const formData = collectValoresBeneficiosData();
    
    if (formData) {
        localStorage.setItem('valoresBeneficiosDraft', JSON.stringify(formData));
        if (typeof showToast === 'function') {
            showToast('success', 'Rascunho', 'Valores de benefícios salvos como rascunho!');
        }
        if (typeof updateSaveStatus === 'function') {
            updateSaveStatus('Rascunho salvo');
        }
    }
}


function submitValoresBeneficiosData() {
    if (!validateValoresBeneficiosForm()) {
        return;
    }
    
    const formData = collectValoresBeneficiosData();
    
    if (typeof showToast === 'function') {
        showToast('info', 'Envio', 'Enviando valores de benefícios...');
    }
    
    setTimeout(() => {
        localStorage.removeItem('valoresBeneficiosDraft');
        if (typeof showToast === 'function') {
            showToast('success', 'Sucesso', 'Valores de benefícios enviados com sucesso!');
        }
        
        setTimeout(() => {
            closeValoresBeneficiosModal();
        }, 1500);
    }, 2000);
}


function collectValoresBeneficiosData() {
    const form = document.getElementById('valoresBeneficiosForm');
    if (!form) return null;
    
    const formData = new FormData(form);
    
    const data = {
        valorCestaBasica: formData.get('valorCestaBasica'),
        valorValeTransporte: formData.get('valorValeTransporte'),
        valorVrVa: formData.get('valorVrVa'),
        valorPlanoSaude: formData.get('valorPlanoSaude'),
        valorPlanoOdonto: formData.get('valorPlanoOdonto'),
        valorSeguroVida: formData.get('valorSeguroVida'),
        valorAuxilioEducacao: formData.get('valorAuxilioEducacao'),
        valorGympass: formData.get('valorGympass'),
        observacoesBeneficios: formData.get('observacoesBeneficios'),
        totais: {
            mensal: getNumericValue('totalMensal') || 0,
            diario: getNumericValue('totalDiario') || 0,
            anual: getNumericValue('totalAnual') || 0
        },
        timestamp: new Date().toISOString()
    };
    
    return data;
}


function validateValoresBeneficiosForm() {
    let isValid = true;
    
    const valores = [
        getNumericValue('valor-cesta-basica'),
        getNumericValue('valor-vale-transporte'),
        getNumericValue('valor-vr-va'),
        getNumericValue('valor-plano-saude'),
        getNumericValue('valor-plano-odonto'),
        getNumericValue('valor-seguro-vida'),
        getNumericValue('valor-auxilio-educacao'),
        getNumericValue('valor-gympass')
    ];
    
    const temBeneficio = valores.some(valor => valor > 0);
    
    if (!temBeneficio) {
        if (typeof showToast === 'function') {
            showToast('warning', 'Validação', 'Configure pelo menos um benefício com valor maior que zero!');
        }
        isValid = false;
    }
    
    const limites = {
        'valor-cesta-basica': { max: 1000, nome: 'Cesta Básica' },
        'valor-vale-transporte': { max: 50, nome: 'Vale Transporte' },
        'valor-vr-va': { max: 100, nome: 'VR/VA' },
        'valor-plano-saude': { max: 2000, nome: 'Plano de Saúde' },
        'valor-plano-odonto': { max: 200, nome: 'Plano Odontológico' },
        'valor-seguro-vida': { max: 500, nome: 'Seguro de Vida' },
        'valor-auxilio-educacao': { max: 3000, nome: 'Auxílio Educação' },
        'valor-gympass': { max: 300, nome: 'Gympass' }
    };
    
    let hasWarning = false;
    
    Object.keys(limites).forEach(fieldId => {
        const valor = getNumericValue(fieldId);
        const limite = limites[fieldId];
        const field = document.getElementById(fieldId);
        
        if (valor > limite.max) {
            if (field) field.style.borderColor = '#f39c12';
            if (typeof showToast === 'function') {
                showToast('warning', 'Atenção', `Valor de ${limite.nome} parece muito alto. Verifique se está correto.`);
            }
            hasWarning = true;
        } else if (field) {
            field.style.borderColor = '';
        }
        
        if (valor < 0) {
            if (field) field.style.borderColor = '#e74c3c';
            if (typeof showToast === 'function') {
                showToast('error', 'Erro', `${limite.nome} não pode ter valor negativo!`);
            }
            isValid = false;
        }
    });
    
    const totalAnual = (getNumericValue('valor-cesta-basica') + 
                       getNumericValue('valor-plano-saude') + 
                       getNumericValue('valor-plano-odonto') + 
                       getNumericValue('valor-seguro-vida') + 
                       getNumericValue('valor-auxilio-educacao') + 
                       getNumericValue('valor-gympass') +
                       ((getNumericValue('valor-vale-transporte') + getNumericValue('valor-vr-va')) * 22)) * 12;
    
    if (totalAnual > 50000) { 
        if (typeof showToast === 'function') {
            showToast('warning', 'Custo Alto', 'O custo total anual por funcionário é muito alto. Revise os valores.');
        }
    }
    
    return isValid;
}


function loadValoresBeneficiosData() {
    const savedData = localStorage.getItem('valoresBeneficiosDraft');
    
    if (savedData) {
        try {
            const data = JSON.parse(savedData);
            
            Object.keys(data).forEach(key => {
                if (key === 'totais' || key === 'timestamp') return; 
                
                const field = document.querySelector(`[name="${key}"]`);
                if (field && data[key]) {
                    field.value = data[key];
                }
            });
            
            setTimeout(() => {
                calculateTotals();
            }, 100);
            
            if (typeof showToast === 'function') {
                showToast('info', 'Dados Carregados', 'Rascunho de valores carregado!');
            }
        } catch (error) {
            console.warn('Erro ao carregar dados de valores:', error);
        }
    }
}

// ===== FORMULÁRIO DE FOLHA DE PAGAMENTO =====


function openFolhaPagamentoForm() {
    console.log('Abrindo formulário de folha de pagamento');
    
    const targetContainer = document.getElementById('modal-container-solicitacoes') || 
                           document.getElementById('modal-container') ||
                           modalContainerSolicitacoes || 
                           modalContainer;
    
    if (!targetContainer) {
        console.error('Container de modal não encontrado!');
        if (typeof showToast === 'function') {
            showToast('error', 'Erro', 'Erro ao abrir formulário. Tente novamente.');
        }
        return;
    }
    
    const formHTML = `
        <div class="modal-overlay" id="folhaPagamentoModalOverlay">
            <div class="modal-content folha-pagamento-form" onclick="event.stopPropagation()">
                <div class="modal-header">
                    <h2><i class="fas fa-file-invoice-dollar"></i> Folha de Pagamento</h2>
                    <button class="close-btn" id="folhaPagamentoCloseBtn">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div class="auto-save-indicator">
                    <i class="fas fa-save"></i>
                    <span> Dados salvos automaticamente</span>
                    <div class="save-status" id="saveStatus">
                        <i class="fas fa-check-circle"></i>
                        <span>Salvo</span>
                    </div>
                </div>

                <div class="form-description">
                    <p><i class="fas fa-info-circle"></i> Configure os dados da folha de pagamento do funcionário para o mês de referência.</p>
                </div>

                <form class="folha-pagamento-form-content" id="folhaPagamentoForm">
                    <div class="form-grid">
                        <!-- Dados Básicos -->
                        <div class="form-group">
                            <label for="funcionario-folha">Funcionário </label>
                            <select id="funcionario-folha" name="funcionario" required>
                                <option value="">Selecione o funcionário...</option>
                                <option value="joao-silva">João Silva - Analista</option>
                                <option value="maria-santos">Maria Santos - Coordenadora</option>
                                <option value="pedro-oliveira">Pedro Oliveira - Desenvolvedor</option>
                                <option value="ana-costa">Ana Costa - Designer</option>
                                <option value="carlos-ferreira">Carlos Ferreira - Gerente</option>
                                <option value="lucia-martins">Lúcia Martins - Assistente</option>
                                <option value="ricardo-alves">Ricardo Alves - Técnico</option>
                                <option value="fernanda-lima">Fernanda Lima - Analista</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="mes-referencia">Mês de Referência </label>
                            <input type="month" 
                                   id="mes-referencia" 
                                   name="mesReferencia" 
                                   required>
                            <small>mm/aaaa</small>
                        </div>
                    </div>

                    <!-- Seção de Atrasos -->
                    <div class="folha-section">
                        <div class="section-header">
                            <h3><i class="fas fa-clock"></i> Atrasos</h3>
                        </div>
                        <div class="atrasos-container" id="atrasosContainer">
                            <!-- Atrasos serão adicionados dinamicamente -->
                        </div>
                        <button type="button" class="btn-add-item" id="addAtrasoBtn">
                            <i class="fas fa-plus"></i> Adicionar Atraso
                        </button>
                    </div>

                    <!-- Seção de Faltas -->
                    <div class="folha-section">
                        <div class="section-header">
                            <h3><i class="fas fa-calendar-times"></i> Faltas</h3>
                        </div>
                        <div class="faltas-container" id="faltasContainer">
                            <!-- Faltas serão adicionadas dinamicamente -->
                        </div>
                        <button type="button" class="btn-add-item" id="addFaltaBtn">
                            <i class="fas fa-plus"></i> Adicionar Falta
                        </button>
                        
                        <div class="dsr-option">
                            <label class="checkbox-container">
                                <input type="checkbox" name="descontarDsr" id="descontar-dsr">
                                <span class="checkmark"></span>
                                <span>Descontar DSR (Descanso Semanal Remunerado)</span>
                            </label>
                        </div>
                    </div>

                    <!-- Seção de Horas Extras -->
                    <div class="folha-section">
                        <div class="section-header">
                            <h3><i class="fas fa-clock"></i> Horas Extras</h3>
                        </div>
                        <div class="horas-extras-container" id="horasExtrasContainer">
                            <!-- Horas extras serão adicionadas dinamicamente -->
                        </div>
                        <button type="button" class="btn-add-item" id="addHoraExtraBtn">
                            <i class="fas fa-plus"></i> Adicionar Hora Extra
                        </button>
                    </div>

                    <!-- Resumo da Folha -->
                    <div class="folha-resumo">
                        <div class="info-card">
                            <h4><i class="fas fa-calculator"></i> Resumo da Folha</h4>
                            <div class="resumo-grid" id="resumoFolha">
                                <p>Adicione itens para ver o resumo</p>
                            </div>
                        </div>
                    </div>
                </form>

                <div class="modal-footer">
                    <button type="button" class="btn-secondary" id="folhaPagamentoCancelBtn">
                        <i class="fas fa-times"></i> Cancelar
                    </button>
                    <button type="button" class="btn-primary" id="folhaPagamentoSaveBtn">
                        <i class="fas fa-save"></i> Salvar Rascunho
                    </button>
                    <button type="button" class="btn-success" id="folhaPagamentoSubmitBtn">
                        <i class="fas fa-paper-plane"></i> Enviar
                    </button>
                </div>
            </div>
        </div>
    `;
    
    targetContainer.innerHTML = formHTML;
    
        setTimeout(() => {
        const closeBtn = document.getElementById('folhaPagamentoCloseBtn');
        if (closeBtn) {
            closeBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Botão X clicado');
                closeFolhaPagamentoModal();
            });
        }
        
        const cancelBtn = document.getElementById('folhaPagamentoCancelBtn');
        if (cancelBtn) {
            cancelBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Botão Cancelar clicado');
                closeFolhaPagamentoModal();
            });
        }
        
        const saveBtn = document.getElementById('folhaPagamentoSaveBtn');
        if (saveBtn) {
            saveBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Botão Salvar clicado');
                saveFolhaPagamentoDraft();
            });
        }
        
        const submitBtn = document.getElementById('folhaPagamentoSubmitBtn');
        if (submitBtn) {
            submitBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Botão Enviar clicado');
                submitFolhaPagamentoData();
            });
        }
        
        const addAtrasoBtn = document.getElementById('addAtrasoBtn');
        if (addAtrasoBtn) {
            addAtrasoBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Botão Adicionar Atraso clicado');
                addAtraso();
            });
        }
        
        const addFaltaBtn = document.getElementById('addFaltaBtn');
        if (addFaltaBtn) {
            addFaltaBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Botão Adicionar Falta clicado');
                addFalta();
            });
        }
        
        const addHoraExtraBtn = document.getElementById('addHoraExtraBtn');
        if (addHoraExtraBtn) {
            addHoraExtraBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Botão Adicionar Hora Extra clicado');
                addHoraExtra();
            });
        }
        
        const overlay = document.getElementById('folhaPagamentoModalOverlay');
        if (overlay) {
            overlay.addEventListener('click', function(e) {
                if (e.target === overlay) {
                    console.log('Overlay clicado');
                    closeFolhaPagamentoModal();
                }
            });
        }
        
    }, 100); 
    
    if (typeof initializeFolhaPagamentoForm === 'function') {
        initializeFolhaPagamentoForm();
    }
    
    if (typeof startAutoSave === 'function') {
        startAutoSave();
    }
}

function closeFolhaPagamentoModal() {
    console.log('Fechando modal de folha de pagamento...');
    
    if (window.autoSaveInterval) {
        clearInterval(window.autoSaveInterval);
        window.autoSaveInterval = null;
    }
    
    const containers = [
        document.getElementById('modal-container'),
        document.getElementById('modal-container-solicitacoes'),
        document.getElementById('modal-container-fiscal')
    ];
    
    containers.forEach(container => {
        if (container) {
            container.innerHTML = '';
        }
    });
    
    const overlay = document.getElementById('folhaPagamentoModalOverlay');
    if (overlay && overlay.parentElement) {
        overlay.parentElement.removeChild(overlay);
    }
    
    console.log('Modal de folha de pagamento fechado');
}


function initializeFolhaPagamentoForm() {
    console.log('Inicializando formulário de folha de pagamento');
    
    try {
        loadFolhaPagamentoData();
        
        setupFolhaPagamentoEvents();
        
        const today = new Date();
        const currentMonth = today.toISOString().slice(0, 7);
        const mesReferenciaElement = document.getElementById('mes-referencia');
        if (mesReferenciaElement) {
            mesReferenciaElement.value = currentMonth;
        }
        
        console.log('Formulário de folha de pagamento inicializado com sucesso');
    } catch (error) {
        console.error('Erro ao inicializar formulário de folha de pagamento:', error);
    }
}


function setupFolhaPagamentoEvents() {
    const funcionario = document.getElementById('funcionario-folha');
    const mesReferencia = document.getElementById('mes-referencia');
    const descontarDsr = document.getElementById('descontar-dsr');
    
    if (funcionario) {
        funcionario.addEventListener('change', updateResumoFolha);
    }
    if (mesReferencia) {
        mesReferencia.addEventListener('change', updateResumoFolha);
    }
    if (descontarDsr) {
        descontarDsr.addEventListener('change', function() {
            updateResumoFolha();
            if (typeof triggerAutoSave === 'function') {
                triggerAutoSave();
            }
        });
    }
}


function addAtraso() {
    const container = document.getElementById('atrasosContainer');
    if (!container) return;
    
    const atrasoCount = container.children.length + 1;
    
    const atrasoHTML = `
        <div class="item-card atraso-card" data-item="${atrasoCount}">
            <div class="item-header">
                <h4><i class="fas fa-clock"></i> Atraso ${atrasoCount}</h4>
                <button type="button" class="btn-remove-item" data-atraso-number="${atrasoCount}" title="Remover atraso">
                    <i class="fas fa-trash"></i> Remover
                </button>
            </div>
            
            <div class="item-form-grid">
                <div class="form-group">
                    <label for="data-atraso-${atrasoCount}">Data do Atraso </label>
                    <input type="date" 
                           id="data-atraso-${atrasoCount}" 
                           name="atrasos[${atrasoCount}][data]" 
                           required>
                </div>
                
                <div class="form-group">
                    <label for="tempo-atraso-${atrasoCount}">Tempo de Atraso (minutos) </label>
                    <input type="number" 
                           id="tempo-atraso-${atrasoCount}" 
                           name="atrasos[${atrasoCount}][tempo]" 
                           min="1"
                           value="0"
                           required>
                </div>
                
                <div class="form-group full-width">
                    <label for="motivo-atraso-${atrasoCount}">Motivo (opcional)</label>
                    <input type="text" 
                           id="motivo-atraso-${atrasoCount}" 
                           name="atrasos[${atrasoCount}][motivo]" 
                           placeholder="Ex: Trânsito">
                </div>
            </div>
        </div>
    `;
    
    container.insertAdjacentHTML('beforeend', atrasoHTML);
    
    setTimeout(() => {
        const removeBtn = container.querySelector(`[data-atraso-number="${atrasoCount}"]`);
        if (removeBtn) {
            removeBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log(`Botão remover atraso ${atrasoCount} clicado`);
                removeAtraso(this);
            });
        }
    }, 50);
    
    setupItemEvents(atrasoCount, 'atraso');
    
    if (typeof showToast === 'function') {
        showToast('success', 'Atraso', `Atraso ${atrasoCount} adicionado!`);
    }
    updateResumoFolha();
}


function removeAtraso(button) {
    const atrasoCard = button.closest('.atraso-card');
    if (!atrasoCard) return;
    
    const atrasoNumber = atrasoCard.dataset.item;
    
    if (confirm(`Tem certeza que deseja remover o Atraso ${atrasoNumber}?`)) {
        atrasoCard.remove();
        renumberItems('atraso');
        if (typeof showToast === 'function') {
            showToast('info', 'Atraso', `Atraso ${atrasoNumber} removido!`);
        }
        updateResumoFolha();
    }
}


function addFalta() {
    const container = document.getElementById('faltasContainer');
    if (!container) return;
    
    const faltaCount = container.children.length + 1;
    
    const faltaHTML = `
        <div class="item-card falta-card" data-item="${faltaCount}">
            <div class="item-header">
                <h4><i class="fas fa-calendar-times"></i> Falta ${faltaCount}</h4>
                <button type="button" class="btn-remove-item" data-falta-number="${faltaCount}" title="Remover falta">
                    <i class="fas fa-trash"></i> Remover
                </button>
            </div>
            
            <div class="item-form-grid">
                <div class="form-group">
                    <label for="data-falta-${faltaCount}">Data da Falta </label>
                    <input type="date" 
                           id="data-falta-${faltaCount}" 
                           name="faltas[${faltaCount}][data]" 
                           required>
                </div>
                
                <div class="form-group">
                    <label for="tipo-falta-${faltaCount}">Tipo de Falta </label>
                    <select id="tipo-falta-${faltaCount}" 
                            name="faltas[${faltaCount}][tipo]" 
                            required>
                        <option value="">Selecione...</option>
                        <option value="injustificada">Falta Injustificada</option>
                        <option value="justificada">Falta Justificada</option>
                        <option value="medica">Falta Médica</option>
                        <option value="luto">Falta por Luto</option>
                        <option value="casamento">Falta por Casamento</option>
                        <option value="nascimento-filho">Falta por Nascimento de Filho</option>
                        <option value="doacao-sangue">Falta por Doação de Sangue</option>
                        <option value="alistamento">Falta por Alistamento</option>
                        <option value="outros">Outros</option>
                    </select>
                </div>
                
                <div class="form-group full-width">
                    <label for="motivo-falta-${faltaCount}">Motivo (opcional)</label>
                    <textarea id="motivo-falta-${faltaCount}" 
                              name="faltas[${faltaCount}][motivo]" 
                              rows="2"
                              placeholder="Descreva o motivo"></textarea>
                </div>
            </div>
        </div>
    `;
    
    container.insertAdjacentHTML('beforeend', faltaHTML);
    
    setTimeout(() => {
        const removeBtn = container.querySelector(`[data-falta-number="${faltaCount}"]`);
        if (removeBtn) {
            removeBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log(`Botão remover falta ${faltaCount} clicado`);
                removeFalta(this);
            });
        }
    }, 50);
    
    setupItemEvents(faltaCount, 'falta');
    
    if (typeof showToast === 'function') {
        showToast('success', 'Falta', `Falta ${faltaCount} adicionada!`);
    }
    updateResumoFolha();
}


function removeFalta(button) {
    const faltaCard = button.closest('.falta-card');
    if (!faltaCard) return;
    
    const faltaNumber = faltaCard.dataset.item;
    
    if (confirm(`Tem certeza que deseja remover a Falta ${faltaNumber}?`)) {
        faltaCard.remove();
        renumberItems('falta');
        if (typeof showToast === 'function') {
            showToast('info', 'Falta', `Falta ${faltaNumber} removida!`);
        }
        updateResumoFolha();
    }
}


function addHoraExtra() {
    const container = document.getElementById('horasExtrasContainer');
    if (!container) return;
    
    const horaExtraCount = container.children.length + 1;
    
    const horaExtraHTML = `
        <div class="item-card hora-extra-card" data-item="${horaExtraCount}">
            <div class="item-header">
                <h4><i class="fas fa-clock"></i> Hora Extra ${horaExtraCount}</h4>
                <button type="button" class="btn-remove-item" data-hora-extra-number="${horaExtraCount}" title="Remover hora extra">
                    <i class="fas fa-trash"></i> Remover
                </button>
            </div>
            
            <div class="item-form-grid">
                <div class="form-group">
                    <label for="data-hora-extra-${horaExtraCount}">Data </label>
                    <input type="date" 
                           id="data-hora-extra-${horaExtraCount}" 
                           name="horasExtras[${horaExtraCount}][data]" 
                           required>
                </div>
                
                <div class="form-group">
                    <label for="quantidade-horas-${horaExtraCount}">Quantidade de Horas (decimais) </label>
                    <input type="number" 
                           id="quantidade-horas-${horaExtraCount}" 
                           name="horasExtras[${horaExtraCount}][quantidade]" 
                           min="0.25"
                           step="0.25"
                           value="0.00"
                           required>
                </div>
                
                <div class="form-group">
                    <label for="percentual-hora-extra-${horaExtraCount}">Percentual </label>
                    <select id="percentual-hora-extra-${horaExtraCount}" 
                            name="horasExtras[${horaExtraCount}][percentual]" 
                            required>
                        <option value="">Selecione...</option>
                        <option value="50">50% - Hora Extra Normal</option>
                        <option value="100">100% - Hora Extra Noturna/Domingo/Feriado</option>
                        <option value="75">75% - Hora Extra Especial</option>
                    </select>
                </div>
                
                <div class="form-group full-width">
                    <label for="justificativa-hora-extra-${horaExtraCount}">Justificativa </label>
                    <textarea id="justificativa-hora-extra-${horaExtraCount}" 
                              name="horasExtras[${horaExtraCount}][justificativa]" 
                              rows="2"
                              placeholder="Ex: Entrega urgente"
                              required></textarea>
                </div>
            </div>
        </div>
    `;
    
    container.insertAdjacentHTML('beforeend', horaExtraHTML);
    
    setTimeout(() => {
        const removeBtn = container.querySelector(`[data-hora-extra-number="${horaExtraCount}"]`);
        if (removeBtn) {
            removeBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log(`Botão remover hora extra ${horaExtraCount} clicado`);
                removeHoraExtra(this);
            });
        }
    }, 50);
    
    setupItemEvents(horaExtraCount, 'horaExtra');
    
    if (typeof showToast === 'function') {
        showToast('success', 'Hora Extra', `Hora Extra ${horaExtraCount} adicionada!`);
    }
    updateResumoFolha();
}


function removeHoraExtra(button) {
    const horaExtraCard = button.closest('.hora-extra-card');
    if (!horaExtraCard) return;
    
    const horaExtraNumber = horaExtraCard.dataset.item;
    
    if (confirm(`Tem certeza que deseja remover a Hora Extra ${horaExtraNumber}?`)) {
        horaExtraCard.remove();
        renumberItems('horaExtra');
        if (typeof showToast === 'function') {
            showToast('info', 'Hora Extra', `Hora Extra ${horaExtraNumber} removida!`);
        }
        updateResumoFolha();
    }
}


function setupItemEvents(itemCount, itemType) {
    const inputs = document.querySelectorAll(`[name*="${itemType}s[${itemCount}]"]`);
    inputs.forEach(input => {
        input.addEventListener('change', function() {
            updateResumoFolha();
            if (typeof triggerAutoSave === 'function') {
                triggerAutoSave();
            }
        });
        
        input.addEventListener('input', function() {
            if (typeof triggerAutoSave === 'function') {
                triggerAutoSave();
            }
        });
    });
}


function renumberItems(itemType) {
    const containerMap = {
        'atraso': 'atrasosContainer',
        'falta': 'faltasContainer', 
        'horaExtra': 'horasExtrasContainer'
    };
    
    const classMap = {
        'atraso': 'atraso-card',
        'falta': 'falta-card',
        'horaExtra': 'hora-extra-card'
    };
    
    const iconMap = {
        'atraso': 'fas fa-clock',
        'falta': 'fas fa-calendar-times',
        'horaExtra': 'fas fa-clock'
    };
    
    const titleMap = {
        'atraso': 'Atraso',
        'falta': 'Falta',
        'horaExtra': 'Hora Extra'
    };
    
    const container = document.getElementById(containerMap[itemType]);
    if (!container) return;
    
    const cards = container.querySelectorAll(`.${classMap[itemType]}`);
    
    cards.forEach((card, index) => {
        const newNumber = index + 1;
        const oldNumber = card.dataset.item;
        
        card.dataset.item = newNumber;
        
        const header = card.querySelector('.item-header h4');
        if (header) {
            header.innerHTML = `<i class="${iconMap[itemType]}"></i> ${titleMap[itemType]} ${newNumber}`;
        }
        
        const removeBtn = card.querySelector('.btn-remove-item');
        if (removeBtn) {
            const dataAttribute = `data-${itemType.toLowerCase()}-number`;
            removeBtn.setAttribute(dataAttribute, newNumber);
        }
        
        const inputs = card.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            if (input.id) {
                input.id = input.id.replace(`-${oldNumber}`, `-${newNumber}`);
            }
            if (input.name) {
                input.name = input.name.replace(`[${oldNumber}]`, `[${newNumber}]`);
            }
        });
        
        const labels = card.querySelectorAll('label');
        labels.forEach(label => {
            if (label.getAttribute('for')) {
                label.setAttribute('for', label.getAttribute('for').replace(`-${oldNumber}`, `-${newNumber}`));
            }
        });
    });
}


function updateResumoFolha() {
    const funcionarioElement = document.getElementById('funcionario-folha');
    const mesReferenciaElement = document.getElementById('mes-referencia');
    const resumoDiv = document.getElementById('resumoFolha');
    
    if (!funcionarioElement || !mesReferenciaElement || !resumoDiv) return;
    
    const funcionario = funcionarioElement.value;
    const mesReferencia = mesReferenciaElement.value;
    
    if (!funcionario || !mesReferencia) {
        resumoDiv.innerHTML = '<p>Selecione funcionário e mês para ver o resumo</p>';
        return;
    }
    
    // Coletar dados
    const atrasos = collectAtrasos();
    const faltas = collectFaltas();
    const horasExtras = collectHorasExtras();
    const descontarDsrElement = document.getElementById('descontar-dsr');
    const descontarDsr = descontarDsrElement ? descontarDsrElement.checked : false;
    
    // Calcular totais
    const totalMinutosAtraso = atrasos.reduce((total, atraso) => total + parseInt(atraso.tempo || 0), 0);
    const totalFaltas = faltas.length;
    const totalHorasExtras = horasExtras.reduce((total, he) => total + parseFloat(he.quantidade || 0), 0);
    
    // Gerar resumo
    const funcionarioText = funcionarioElement.options[funcionarioElement.selectedIndex].text;
    
    resumoDiv.innerHTML = `
        <div class="resumo-grid">
            <div class="resumo-item">
                <strong>Funcionário:</strong>
                <span>${funcionarioText}</span>
            </div>
            <div class="resumo-item">
                <strong>Mês de Referência:</strong>
                <span>${formatMonthYear(mesReferencia)}</span>
            </div>
            <div class="resumo-item">
                <strong>Total de Atrasos:</strong>
                <span class="${atrasos.length > 0 ? 'text-warning' : 'text-success'}">
                    ${atrasos.length} (${Math.floor(totalMinutosAtraso / 60)}h ${totalMinutosAtraso % 60}min)
                </span>
            </div>
            <div class="resumo-item">
                <strong>Total de Faltas:</strong>
                <span class="${totalFaltas > 0 ? 'text-danger' : 'text-success'}">
                    ${totalFaltas} dia${totalFaltas !== 1 ? 's' : ''}
                </span>
            </div>
            <div class="resumo-item">
                <strong>Total de Horas Extras:</strong>
                <span class="${totalHorasExtras > 0 ? 'text-success' : ''}">
                    ${totalHorasExtras.toFixed(2)} hora${totalHorasExtras !== 1 ? 's' : ''}
                </span>
            </div>
            <div class="resumo-item">
                <strong>Desconto DSR:</strong>
                <span class="${descontarDsr ? 'text-danger' : 'text-success'}">
                    ${descontarDsr ? 'Sim' : 'Não'}
                </span>
            </div>
        </div>
        
        ${atrasos.length > 0 || faltas.length > 0 || horasExtras.length > 0 ? `
            <div class="detalhes-resumo">
                ${atrasos.length > 0 ? `
                    <div class="detalhe-section">
                        <h5><i class="fas fa-clock"></i> Atrasos Registrados</h5>
                        <ul>
                            ${atrasos.map(atraso => `
                                <li>${formatDate(atraso.data)} - ${atraso.tempo} min${atraso.motivo ? ` (${atraso.motivo})` : ''}</li>
                            `).join('')}
                        </ul>
                    </div>
                ` : ''}
                
                ${faltas.length > 0 ? `
                    <div class="detalhe-section">
                        <h5><i class="fas fa-calendar-times"></i> Faltas Registradas</h5>
                        <ul>
                            ${faltas.map(falta => `
                                <li>${formatDate(falta.data)} - ${getTipoFaltaText(falta.tipo)}${falta.motivo ? ` (${falta.motivo})` : ''}</li>
                            `).join('')}
                        </ul>
                    </div>
                ` : ''}
                
                ${horasExtras.length > 0 ? `
                    <div class="detalhe-section">
                        <h5><i class="fas fa-clock"></i> Horas Extras Registradas</h5>
                        <ul>
                            ${horasExtras.map(he => `
                                <li>${formatDate(he.data)} - ${he.quantidade}h (${he.percentual}%) - ${he.justificativa}</li>
                            `).join('')}
                        </ul>
                    </div>
                ` : ''}
            </div>
        ` : ''}
    `;
}


function collectAtrasos() {
    const atrasos = [];
    const atrasosCards = document.querySelectorAll('.atraso-card');
    
    atrasosCards.forEach((card, index) => {
        const numero = index + 1;
        const dataInput = card.querySelector(`input[name*="[data]"]`);
        const tempoInput = card.querySelector(`input[name*="[tempo]"]`);
        const motivoInput = card.querySelector(`input[name*="[motivo]"]`);
        
        const data = dataInput ? dataInput.value : '';
        const tempo = tempoInput ? tempoInput.value : '';
        const motivo = motivoInput ? motivoInput.value : '';
        
        if (data && tempo) {
            atrasos.push({ numero, data, tempo, motivo });
        }
    });
    
    return atrasos;
}


function collectFaltas() {
    const faltas = [];
    const faltasCards = document.querySelectorAll('.falta-card');
    
    faltasCards.forEach((card, index) => {
        const numero = index + 1;
        const dataInput = card.querySelector(`input[name*="[data]"]`);
        const tipoSelect = card.querySelector(`select[name*="[tipo]"]`);
        const motivoTextarea = card.querySelector(`textarea[name*="[motivo]"]`);
        
        const data = dataInput ? dataInput.value : '';
        const tipo = tipoSelect ? tipoSelect.value : '';
        const motivo = motivoTextarea ? motivoTextarea.value : '';
        
        if (data && tipo) {
            faltas.push({ numero, data, tipo, motivo });
        }
    });
    
    return faltas;
}


function collectHorasExtras() {
    const horasExtras = [];
    const horasExtrasCards = document.querySelectorAll('.hora-extra-card');
    
    horasExtrasCards.forEach((card, index) => {
        const numero = index + 1;
        const dataInput = card.querySelector(`input[name*="[data]"]`);
        const quantidadeInput = card.querySelector(`input[name*="[quantidade]"]`);
        const percentualSelect = card.querySelector(`select[name*="[percentual]"]`);
        const justificativaTextarea = card.querySelector(`textarea[name*="[justificativa]"]`);
        
        const data = dataInput ? dataInput.value : '';
        const quantidade = quantidadeInput ? quantidadeInput.value : '';
        const percentual = percentualSelect ? percentualSelect.value : '';
        const justificativa = justificativaTextarea ? justificativaTextarea.value : '';
        
        if (data && quantidade && percentual && justificativa) {
            horasExtras.push({ numero, data, quantidade, percentual, justificativa });
        }
    });
    
    return horasExtras;
}


function formatDate(dateString) {
    if (!dateString) return '';
    try {
        const date = new Date(dateString + 'T00:00:00');
        return date.toLocaleDateString('pt-BR');
    } catch (error) {
        return dateString;
    }
}


function formatMonthYear(monthString) {
    if (!monthString) return '';
    try {
        const [year, month] = monthString.split('-');
        const monthNames = [
            'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
            'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ];
        return `${monthNames[parseInt(month) - 1]} de ${year}`;
    } catch (error) {
        return monthString;
    }
}


function getTipoFaltaText(tipo) {
    const tiposMap = {
        'injustificada': 'Falta Injustificada',
        'justificada': 'Falta Justificada',
        'medica': 'Falta Médica',
        'luto': 'Falta por Luto',
        'casamento': 'Falta por Casamento',
        'nascimento-filho': 'Falta por Nascimento de Filho',
        'doacao-sangue': 'Falta por Doação de Sangue',
        'alistamento': 'Falta por Alistamento',
        'outros': 'Outros'
    };
    
    return tiposMap[tipo] || tipo;
}


function saveFolhaPagamentoDraft() {
    const formData = collectFolhaPagamentoData();
    
    localStorage.setItem('folhaPagamentoDraft', JSON.stringify(formData));
    
    if (typeof showToast === 'function') {
        showToast('success', 'Rascunho', 'Folha de pagamento salva como rascunho!');
    }
    
    if (typeof updateSaveStatus === 'function') {
        updateSaveStatus('Rascunho salvo');
    }
}


function submitFolhaPagamentoData() {
    if (!validateFolhaPagamentoForm()) {
        return;
    }
    
    const formData = collectFolhaPagamentoData();
    
    if (typeof showToast === 'function') {
        showToast('info', 'Envio', 'Enviando folha de pagamento...');
    }
    
    setTimeout(() => {
        localStorage.removeItem('folhaPagamentoDraft');
        
        if (typeof showToast === 'function') {
            showToast('success', 'Sucesso', 'Folha de pagamento enviada com sucesso!');
        }
        
        setTimeout(() => {
            closeFolhaPagamentoModal();
        }, 1500);
    }, 2000);
}


function collectFolhaPagamentoData() {
    const funcionarioElement = document.getElementById('funcionario-folha');
    const mesReferenciaElement = document.getElementById('mes-referencia');
    const descontarDsrElement = document.getElementById('descontar-dsr');
    
    const data = {
        funcionario: funcionarioElement ? funcionarioElement.value : '',
        mesReferencia: mesReferenciaElement ? mesReferenciaElement.value : '',
        descontarDsr: descontarDsrElement ? descontarDsrElement.checked : false,
        atrasos: collectAtrasos(),
        faltas: collectFaltas(),
        horasExtras: collectHorasExtras(),
        timestamp: new Date().toISOString()
    };
    
    return data;
}


function validateFolhaPagamentoForm() {
    let isValid = true;
    
    const funcionario = document.getElementById('funcionario-folha');
    const mesReferencia = document.getElementById('mes-referencia');
    
    [funcionario, mesReferencia].forEach(field => {
        if (field) {
            field.style.borderColor = '';
        }
    });
    
    if (!funcionario || !funcionario.value) {
        if (funcionario) funcionario.style.borderColor = '#e74c3c';
        isValid = false;
    }
    
    if (!mesReferencia || !mesReferencia.value) {
        if (mesReferencia) mesReferencia.style.borderColor = '#e74c3c';
        isValid = false;
    }
    
    const atrasos = collectAtrasos();
    const faltas = collectFaltas();
    const horasExtras = collectHorasExtras();
    
    if (atrasos.length === 0 && faltas.length === 0 && horasExtras.length === 0) {
        if (typeof showToast === 'function') {
            showToast('warning', 'Validação', 'Adicione pelo menos um item (atraso, falta ou hora extra)!');
        }
        isValid = false;
    }
    
    if (mesReferencia && mesReferencia.value) {
        const mesRef = new Date(mesReferencia.value + '-01');
        const proximoMes = new Date(mesRef.getFullYear(), mesRef.getMonth() + 1, 0);
        
        [...atrasos, ...faltas, ...horasExtras].forEach(item => {
            if (item.data) {
                try {
                    const dataItem = new Date(item.data + 'T00:00:00');
                    if (dataItem < mesRef || dataItem > proximoMes) {
                        if (typeof showToast === 'function') {
                            showToast('warning', 'Validação', `Data ${formatDate(item.data)} está fora do mês de referência!`);
                        }
                        isValid = false;
                    }
                } catch (error) {
                    console.warn('Erro ao validar data:', error);
                }
            }
        });
    }
    
    if (!isValid && typeof showToast === 'function') {
        showToast('error', 'Validação', 'Corrija os erros antes de enviar!');
    }
    
    return isValid;
}


function loadFolhaPagamentoData() {
    const savedData = localStorage.getItem('folhaPagamentoDraft');
    
    if (savedData) {
        try {
            const data = JSON.parse(savedData);
            
            if (data.funcionario) {
                const funcionarioElement = document.getElementById('funcionario-folha');
                if (funcionarioElement) {
                    funcionarioElement.value = data.funcionario;
                }
            }
            
            if (data.mesReferencia) {
                const mesReferenciaElement = document.getElementById('mes-referencia');
                if (mesReferenciaElement) {
                    mesReferenciaElement.value = data.mesReferencia;
                }
            }
            
            if (data.descontarDsr) {
                const descontarDsrElement = document.getElementById('descontar-dsr');
                if (descontarDsrElement) {
                    descontarDsrElement.checked = data.descontarDsr;
                }
            }
            
            if (data.atrasos && data.atrasos.length > 0) {
                data.atrasos.forEach((atraso, index) => {
                    addAtraso();
                    setTimeout(() => {
                        const cards = document.querySelectorAll('.atraso-card');
                        if (cards[index]) {
                            const card = cards[index];
                            const dataInput = card.querySelector(`input[name*="[data]"]`);
                            const tempoInput = card.querySelector(`input[name*="[tempo]"]`);
                            const motivoInput = card.querySelector(`input[name*="[motivo]"]`);
                            
                            if (dataInput) dataInput.value = atraso.data || '';
                            if (tempoInput) tempoInput.value = atraso.tempo || '';
                            if (motivoInput) motivoInput.value = atraso.motivo || '';
                        }
                    }, 50 * index);
                });
            }
            
            if (data.faltas && data.faltas.length > 0) {
                data.faltas.forEach((falta, index) => {
                    addFalta();
                    setTimeout(() => {
                        const cards = document.querySelectorAll('.falta-card');
                        if (cards[index]) {
                            const card = cards[index];
                            const dataInput = card.querySelector(`input[name*="[data]"]`);
                            const tipoSelect = card.querySelector(`select[name*="[tipo]"]`);
                            const motivoTextarea = card.querySelector(`textarea[name*="[motivo]"]`);
                            
                            if (dataInput) dataInput.value = falta.data || '';
                            if (tipoSelect) tipoSelect.value = falta.tipo || '';
                            if (motivoTextarea) motivoTextarea.value = falta.motivo || '';
                        }
                    }, 50 * index);
                });
            }
            
            if (data.horasExtras && data.horasExtras.length > 0) {
                data.horasExtras.forEach((he, index) => {
                    addHoraExtra();
                    setTimeout(() => {
                        const cards = document.querySelectorAll('.hora-extra-card');
                        if (cards[index]) {
                            const card = cards[index];
                            const dataInput = card.querySelector(`input[name*="[data]"]`);
                            const quantidadeInput = card.querySelector(`input[name*="[quantidade]"]`);
                            const percentualSelect = card.querySelector(`select[name*="[percentual]"]`);
                            const justificativaTextarea = card.querySelector(`textarea[name*="[justificativa]"]`);
                            
                            if (dataInput) dataInput.value = he.data || '';
                            if (quantidadeInput) quantidadeInput.value = he.quantidade || '';
                            if (percentualSelect) percentualSelect.value = he.percentual || '';
                            if (justificativaTextarea) justificativaTextarea.value = he.justificativa || '';
                        }
                    }, 50 * index);
                });
            }
            
            setTimeout(() => {
                updateResumoFolha();
            }, 200);
            
            if (typeof showToast === 'function') {
                showToast('info', 'Dados Carregados', 'Rascunho da folha carregado!');
            }
        } catch (error) {
            console.warn('Erro ao carregar dados da folha:', error);
        }
    }
}


function updateSaveStatus(message) {
    const saveStatus = document.getElementById('saveStatus');
    if (saveStatus) {
        const span = saveStatus.querySelector('span');
        if (span) {
            span.textContent = message;
        }
        
        saveStatus.style.animation = 'pulse 0.5s ease-in-out';
        setTimeout(() => {
            if (saveStatus) {
                saveStatus.style.animation = '';
            }
        }, 500);
    }
}

// ===== FORMULÁRIO DE DETALHES DA RESCISÃO =====


function openDetalhesRescisaoForm() {
    console.log('Abrindo formulário de detalhes da rescisão');
    
    const targetContainer = document.getElementById('modal-container-solicitacoes') || 
                           document.getElementById('modal-container') ||
                           modalContainerSolicitacoes || 
                           modalContainer;
    
    if (!targetContainer) {
        console.error('Container de modal não encontrado!');
        if (typeof showToast === 'function') {
            showToast('error', 'Erro', 'Erro ao abrir formulário. Tente novamente.');
        }
        return;
    }
    
    const formHTML = `
        <div class="modal-overlay" id="detalhesRescisaoModalOverlay">
            <div class="modal-content detalhes-rescisao-form" onclick="event.stopPropagation()">
                <div class="modal-header">
                    <h2><i class="fas fa-file-contract"></i> Detalhes da Rescisão</h2>
                    <button class="close-btn" id="detalhesRescisaoCloseBtn">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div class="auto-save-indicator">
                    <i class="fas fa-save"></i>
                    <span> Dados salvos automaticamente</span>
                    <div class="save-status" id="saveStatus">
                        <i class="fas fa-check-circle"></i>
                        <span>Salvo</span>
                    </div>
                </div>

                <div class="form-description">
                    <p><i class="fas fa-info-circle"></i> Preencha os detalhes específicos da rescisão contratual, incluindo período de aviso prévio e ocorrências durante o contrato.</p>
                </div>

                <form class="detalhes-rescisao-form-content" id="detalhesRescisaoForm">
                    <div class="form-grid">
                        <!-- Funcionário -->
                        <div class="form-group">
                            <label for="funcionario-detalhes">Funcionário </label>
                            <select id="funcionario-detalhes" name="funcionario" required>
                                <option value="">Selecione o funcionário...</option>
                                <option value="joao-silva">João Silva - Analista</option>
                                <option value="maria-santos">Maria Santos - Coordenadora</option>
                                <option value="pedro-oliveira">Pedro Oliveira - Desenvolvedor</option>
                                <option value="ana-costa">Ana Costa - Designer</option>
                                <option value="carlos-ferreira">Carlos Ferreira - Gerente</option>
                                <option value="lucia-martins">Lúcia Martins - Assistente</option>
                                <option value="ricardo-alves">Ricardo Alves - Técnico</option>
                                <option value="fernanda-lima">Fernanda Lima - Analista</option>
                                <option value="roberto-santos">Roberto Santos - Supervisor</option>
                                <option value="patricia-costa">Patrícia Costa - Consultora</option>
                            </select>
                        </div>
                        
                        <!-- Período de Aviso Prévio -->
                        <div class="form-group">
                            <label for="inicio-aviso-previo">Início do Aviso Prévio </label>
                            <input type="date" 
                                   id="inicio-aviso-previo" 
                                   name="inicioAvisoPrevio" 
                                   required>
                        </div>
                        
                        <div class="form-group">
                            <label for="fim-aviso-previo">Fim do Aviso Prévio </label>
                            <input type="date" 
                                   id="fim-aviso-previo" 
                                   name="fimAvisoPrevio" 
                                   required>
                        </div>
                        
                        <!-- Ocorrências durante o contrato -->
                        <div class="form-group">
                            <label for="atrasos-minutos">Atrasos (em minutos)</label>
                            <input type="number" 
                                   id="atrasos-minutos" 
                                   name="atrasosMinutos" 
                                   min="0"
                                   value="0"
                                   placeholder="0">
                            <small>Total de minutos de atraso durante o contrato</small>
                        </div>
                        
                        <div class="form-group">
                            <label for="faltas-dias">Faltas (quantidade de dias)</label>
                            <input type="number" 
                                   id="faltas-dias" 
                                   name="faltasDias" 
                                   min="0"
                                   value="0"
                                   placeholder="0">
                            <small>Total de dias de falta durante o contrato</small>
                        </div>
                        
                        <div class="form-group">
                            <label for="horas-extras">Horas Extras (em decimais)</label>
                            <input type="number" 
                                   id="horas-extras" 
                                   name="horasExtras" 
                                   min="0"
                                   step="0.25"
                                   value="0.00"
                                   placeholder="0,00">
                            <small>Total de horas extras durante o contrato</small>
                        </div>
                        
                        <!-- Observações adicionais -->
                        <div class="form-group full-width">
                            <label for="observacoes-detalhes">Observações Adicionais</label>
                            <textarea id="observacoes-detalhes" 
                                      name="observacoesDetalhes" 
                                      rows="4" 
                                      placeholder="Informações complementares sobre a rescisão, desempenho do funcionário, motivos específicos, etc."></textarea>
                        </div>
                        
                        <!-- Resumo dos Detalhes -->
                        <div class="form-group full-width detalhes-info">
                            <div class="info-card">
                                <h4><i class="fas fa-chart-line"></i> Resumo dos Detalhes</h4>
                                <div class="detalhes-summary" id="detalhesSummary">
                                    <p>Preencha os dados para ver o resumo</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>

                <div class="modal-footer">
                    <button type="button" class="btn-secondary" id="detalhesRescisaoCancelBtn">
                        <i class="fas fa-times"></i> Cancelar
                    </button>
                    <button type="button" class="btn-primary" id="detalhesRescisaoSaveBtn">
                        <i class="fas fa-save"></i> Salvar Rascunho
                    </button>
                    <button type="button" class="btn-success" id="detalhesRescisaoSubmitBtn">
                        <i class="fas fa-paper-plane"></i> Enviar
                    </button>
                </div>
            </div>
        </div>
    `;
    
    targetContainer.innerHTML = formHTML;
    
        setTimeout(() => {
        const closeBtn = document.getElementById('detalhesRescisaoCloseBtn');
        if (closeBtn) {
            closeBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Botão X clicado');
                closeDetalhesRescisaoModal();
            });
        }
        
        const cancelBtn = document.getElementById('detalhesRescisaoCancelBtn');
        if (cancelBtn) {
            cancelBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Botão Cancelar clicado');
                closeDetalhesRescisaoModal();
            });
        }
        
        const saveBtn = document.getElementById('detalhesRescisaoSaveBtn');
        if (saveBtn) {
            saveBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Botão Salvar clicado');
                saveDetalhesRescisaoDraft();
            });
        }
        
        const submitBtn = document.getElementById('detalhesRescisaoSubmitBtn');
        if (submitBtn) {
            submitBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Botão Enviar clicado');
                submitDetalhesRescisaoData();
            });
        }
        
        const overlay = document.getElementById('detalhesRescisaoModalOverlay');
        if (overlay) {
            overlay.addEventListener('click', function(e) {
                if (e.target === overlay) {
                    console.log('Overlay clicado');
                    closeDetalhesRescisaoModal();
                }
            });
        }
        
    }, 100); 
    
    if (typeof initializeDetalhesRescisaoForm === 'function') {
        initializeDetalhesRescisaoForm();
    }
    
    if (typeof startAutoSave === 'function') {
        startAutoSave();
    }
}

function closeDetalhesRescisaoModal() {
    console.log('Fechando modal de detalhes da rescisão...');
    
    if (window.autoSaveInterval) {
        clearInterval(window.autoSaveInterval);
        window.autoSaveInterval = null;
    }
    
    const containers = [
        document.getElementById('modal-container'),
        document.getElementById('modal-container-solicitacoes'),
        document.getElementById('modal-container-fiscal')
    ];
    
    containers.forEach(container => {
        if (container) {
            container.innerHTML = '';
        }
    });
    
    const overlay = document.getElementById('detalhesRescisaoModalOverlay');
    if (overlay && overlay.parentElement) {
        overlay.parentElement.removeChild(overlay);
    }
    
    console.log('Modal de detalhes da rescisão fechado');
}


function initializeDetalhesRescisaoForm() {
    console.log('Inicializando formulário de detalhes da rescisão');
    
    try {
        loadDetalhesRescisaoData();
        
        setupDetalhesRescisaoEvents();
        
        setupDetalhesRescisaoMasks();
        
        console.log('Formulário de detalhes da rescisão inicializado com sucesso');
    } catch (error) {
        console.error('Erro ao inicializar formulário de detalhes da rescisão:', error);
    }
}


function setupDetalhesRescisaoEvents() {
    const funcionario = document.getElementById('funcionario-detalhes');
    const inicioAvisoPrevio = document.getElementById('inicio-aviso-previo');
    const fimAvisoPrevio = document.getElementById('fim-aviso-previo');
    const atrasosMinutos = document.getElementById('atrasos-minutos');
    const faltasDias = document.getElementById('faltas-dias');
    const horasExtras = document.getElementById('horas-extras');
    const observacoes = document.getElementById('observacoes-detalhes');
    
    if (!funcionario || !inicioAvisoPrevio || !fimAvisoPrevio || !atrasosMinutos || !faltasDias || !horasExtras || !observacoes) {
        console.warn('Alguns elementos do formulário não foram encontrados');
        return;
    }
    
    function updateDetalhesSummary() {
        const summaryDiv = document.getElementById('detalhesSummary');
        if (!summaryDiv) return;
        
        if (funcionario.value && inicioAvisoPrevio.value && fimAvisoPrevio.value) {
            const funcionarioText = funcionario.options[funcionario.selectedIndex].text;
            
            let inicioFormatted, fimFormatted, diffDays;
            
            try {
                const inicioDate = new Date(inicioAvisoPrevio.value + 'T00:00:00');
                const fimDate = new Date(fimAvisoPrevio.value + 'T00:00:00');
                
                inicioFormatted = formatDateBR(inicioDate);
                fimFormatted = formatDateBR(fimDate);
                
                const diffTime = Math.abs(fimDate - inicioDate);
                diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
            } catch (error) {
                console.warn('Erro ao formatar datas:', error);
                inicioFormatted = inicioAvisoPrevio.value;
                fimFormatted = fimAvisoPrevio.value;
                diffDays = 0;
            }
            
            const totalMinutos = parseInt(atrasosMinutos.value) || 0;
            const horasAtraso = Math.floor(totalMinutos / 60);
            const minutosAtraso = totalMinutos % 60;
            
            const totalFaltas = parseInt(faltasDias.value) || 0;
            const totalHorasExtras = parseFloat(horasExtras.value) || 0;
            
            summaryDiv.innerHTML = `
                <div class="summary-container">
                    <div class="summary-item">
                        <strong>Funcionário:</strong> ${funcionarioText}
                    </div>
                    <div class="summary-item">
                        <strong>Período do Aviso Prévio:</strong> 
                        ${inicioFormatted} até ${fimFormatted}
                    </div>
                    <div class="summary-item">
                        <strong>Duração do Aviso:</strong> 
                        <span class="duration-badge">${diffDays} dias</span>
                    </div>
                    
                    <div class="ocorrencias-section">
                        <h5><i class="fas fa-exclamation-triangle"></i> Ocorrências Durante o Contrato</h5>
                        
                        <div class="ocorrencia-item">
                            <div class="ocorrencia-icon atrasos">
                                <i class="fas fa-clock"></i>
                            </div>
                            <div class="ocorrencia-info">
                                <strong>Atrasos</strong>
                                <span class="${totalMinutos > 0 ? 'text-warning' : 'text-success'}">
                                    ${totalMinutos > 0 ? `${horasAtraso}h ${minutosAtraso}min` : 'Nenhum atraso'}
                                </span>
                            </div>
                        </div>
                        
                        <div class="ocorrencia-item">
                            <div class="ocorrencia-icon faltas">
                                <i class="fas fa-calendar-times"></i>
                            </div>
                            <div class="ocorrencia-info">
                                <strong>Faltas</strong>
                                <span class="${totalFaltas > 0 ? 'text-danger' : 'text-success'}">
                                    ${totalFaltas > 0 ? `${totalFaltas} dia${totalFaltas !== 1 ? 's' : ''}` : 'Nenhuma falta'}
                                </span>
                            </div>
                        </div>
                        
                        <div class="ocorrencia-item">
                            <div class="ocorrencia-icon horas-extras">
                                <i class="fas fa-plus-circle"></i>
                            </div>
                            <div class="ocorrencia-info">
                                <strong>Horas Extras</strong>
                                <span class="${totalHorasExtras > 0 ? 'text-success' : ''}">
                                    ${totalHorasExtras > 0 ? `${totalHorasExtras.toFixed(2)} hora${totalHorasExtras !== 1 ? 's' : ''}` : 'Nenhuma hora extra'}
                                </span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="performance-indicator">
                        <h5><i class="fas fa-chart-bar"></i> Indicador de Performance</h5>
                        <div class="performance-score">
                            ${calculatePerformanceScore(totalMinutos, totalFaltas, totalHorasExtras)}
                        </div>
                    </div>
                </div>
            `;
        } else {
            summaryDiv.innerHTML = '<p>Preencha os dados básicos para ver o resumo</p>';
        }
    }
    
    [funcionario, inicioAvisoPrevio, fimAvisoPrevio, atrasosMinutos, faltasDias, horasExtras].forEach(element => {
        if (element) {
            element.addEventListener('change', updateDetalhesSummary);
            element.addEventListener('input', function() {
                updateDetalhesSummary();
                if (typeof triggerAutoSave === 'function') {
                    triggerAutoSave();
                }
            });
        }
    });
    
    if (observacoes) {
        observacoes.addEventListener('input', function() {
            if (typeof triggerAutoSave === 'function') {
                triggerAutoSave();
            }
        });
    }
    
    if (inicioAvisoPrevio) {
        inicioAvisoPrevio.addEventListener('change', function() {
            if (fimAvisoPrevio) {
                fimAvisoPrevio.min = this.value;
                if (fimAvisoPrevio.value && fimAvisoPrevio.value < this.value) {
                    fimAvisoPrevio.value = '';
                    if (typeof showToast === 'function') {
                        showToast('warning', 'Data Inválida', 'Data de fim deve ser posterior ao início!');
                    }
                }
            }
        });
    }
    
    if (fimAvisoPrevio) {
        fimAvisoPrevio.addEventListener('change', function() {
            if (inicioAvisoPrevio && inicioAvisoPrevio.value && this.value < inicioAvisoPrevio.value) {
                this.value = '';
                if (typeof showToast === 'function') {
                    showToast('warning', 'Data Inválida', 'Data de fim deve ser posterior ao início!');
                }
            }
        });
    }
}


function setupDetalhesRescisaoMasks() {
    const horasExtras = document.getElementById('horas-extras');
    const atrasosMinutos = document.getElementById('atrasos-minutos');
    const faltasDias = document.getElementById('faltas-dias');
    
    if (horasExtras) {
        horasExtras.addEventListener('blur', function() {
            const value = parseFloat(this.value) || 0;
            this.value = value.toFixed(2);
        });
        
        horasExtras.addEventListener('input', function() {
            const value = parseFloat(this.value);
            if (value > 1000) { 
                if (typeof showToast === 'function') {
                    showToast('warning', 'Valor Alto', 'Quantidade de horas extras parece muito alta. Verifique se está correto.');
                }
            }
        });
    }
    
    if (atrasosMinutos) {
        atrasosMinutos.addEventListener('input', function() {
            const value = parseInt(this.value);
            if (value > 10080) { 
                if (typeof showToast === 'function') {
                    showToast('warning', 'Valor Alto', 'Valor de atrasos parece muito alto. Verifique se está correto.');
                }
            }
        });
    }
    
    if (faltasDias) {
        faltasDias.addEventListener('input', function() {
            const value = parseInt(this.value);
            if (value > 365) { 
                if (typeof showToast === 'function') {
                    showToast('warning', 'Valor Alto', 'Quantidade de faltas parece muito alta. Verifique se está correto.');
                }
            }
        });
    }
}


function calculatePerformanceScore(atrasos, faltas, horasExtras) {
    let score = 100;
    let classification = '';
    let color = '';
    
    score -= Math.floor(atrasos / 10);
    
    score -= (faltas * 5);
    
    score += Math.floor(horasExtras / 2);
    
    score = Math.max(0, Math.min(100, score));
    
    if (score >= 90) {
        classification = 'Excelente';
        color = '#27ae60';
    } else if (score >= 75) {
        classification = 'Bom';
        color = '#2ecc71';
    } else if (score >= 60) {
        classification = 'Regular';
        color = '#f39c12';
    } else if (score >= 40) {
        classification = 'Ruim';
        color = '#e67e22';
    } else {
        classification = 'Muito Ruim';
        color = '#e74c3c';
    }
    
    return `
        <div class="score-display" style="border-color: ${color}">
            <div class="score-number" style="color: ${color}">${score}</div>
            <div class="score-label" style="color: ${color}">${classification}</div>
        </div>
        <div class="score-bar">
            <div class="score-fill" style="width: ${score}%; background: ${color}"></div>
        </div>
    `;
}


function formatDateBR(date) {
    if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
        return 'Data inválida';
    }
    
    try {
        return date.toLocaleDateString('pt-BR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    } catch (error) {
        console.warn('Erro ao formatar data:', error);
        return date.toLocaleDateString('pt-BR');
    }
}


function saveDetalhesRescisaoDraft() {
    const formData = collectDetalhesRescisaoData();
    
    localStorage.setItem('detalhesRescisaoDraft', JSON.stringify(formData));
    
    if (typeof showToast === 'function') {
        showToast('success', 'Rascunho', 'Detalhes da rescisão salvos como rascunho!');
    }
    
    if (typeof updateSaveStatus === 'function') {
        updateSaveStatus('Rascunho salvo');
    }
}


function submitDetalhesRescisaoData() {
    if (!validateDetalhesRescisaoForm()) {
        return;
    }
    
    const formData = collectDetalhesRescisaoData();
    
    if (typeof showToast === 'function') {
        showToast('info', 'Envio', 'Enviando detalhes da rescisão...');
    }
    
    setTimeout(() => {
        localStorage.removeItem('detalhesRescisaoDraft');
        
        if (typeof showToast === 'function') {
            showToast('success', 'Sucesso', 'Detalhes da rescisão enviados com sucesso!');
        }
        
        setTimeout(() => {
            closeDetalhesRescisaoModal();
        }, 1500);
    }, 2000);
}


function collectDetalhesRescisaoData() {
    const funcionario = document.getElementById('funcionario-detalhes');
    const inicioAvisoPrevio = document.getElementById('inicio-aviso-previo');
    const fimAvisoPrevio = document.getElementById('fim-aviso-previo');
    const atrasosMinutos = document.getElementById('atrasos-minutos');
    const faltasDias = document.getElementById('faltas-dias');
    const horasExtras = document.getElementById('horas-extras');
    const observacoes = document.getElementById('observacoes-detalhes');
    
    const data = {
        funcionario: funcionario ? funcionario.value : '',
        inicioAvisoPrevio: inicioAvisoPrevio ? inicioAvisoPrevio.value : '',
        fimAvisoPrevio: fimAvisoPrevio ? fimAvisoPrevio.value : '',
        atrasosMinutos: atrasosMinutos ? (parseInt(atrasosMinutos.value) || 0) : 0,
        faltasDias: faltasDias ? (parseInt(faltasDias.value) || 0) : 0,
        horasExtras: horasExtras ? (parseFloat(horasExtras.value) || 0) : 0,
        observacoesDetalhes: observacoes ? observacoes.value : '',
        timestamp: new Date().toISOString()
    };
    
    return data;
}


function validateDetalhesRescisaoForm() {
    let isValid = true;
    
    const funcionario = document.getElementById('funcionario-detalhes');
    const inicioAvisoPrevio = document.getElementById('inicio-aviso-previo');
    const fimAvisoPrevio = document.getElementById('fim-aviso-previo');
    
    [funcionario, inicioAvisoPrevio, fimAvisoPrevio].forEach(field => {
        if (field) {
            field.style.borderColor = '';
        }
    });
    
    if (!funcionario || !funcionario.value) {
        if (funcionario) funcionario.style.borderColor = '#e74c3c';
        isValid = false;
    }
    
    if (!inicioAvisoPrevio || !inicioAvisoPrevio.value) {
        if (inicioAvisoPrevio) inicioAvisoPrevio.style.borderColor = '#e74c3c';
        isValid = false;
    }
    
    if (!fimAvisoPrevio || !fimAvisoPrevio.value) {
        if (fimAvisoPrevio) fimAvisoPrevio.style.borderColor = '#e74c3c';
        isValid = false;
    }
    
    if (inicioAvisoPrevio && fimAvisoPrevio && inicioAvisoPrevio.value && fimAvisoPrevio.value) {
        try {
            const inicio = new Date(inicioAvisoPrevio.value + 'T00:00:00');
            const fim = new Date(fimAvisoPrevio.value + 'T00:00:00');
            
            if (fim < inicio) {
                fimAvisoPrevio.style.borderColor = '#e74c3c';
                if (typeof showToast === 'function') {
                    showToast('error', 'Validação', 'Data de fim deve ser posterior à data de início!');
                }
                isValid = false;
            }
            
            const diffTime = Math.abs(fim - inicio);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            if (diffDays > 90) {
                fimAvisoPrevio.style.borderColor = '#f39c12';
                if (typeof showToast === 'function') {
                    showToast('warning', 'Validação', 'Período de aviso prévio muito longo. Verifique se está correto.');
                }
            }
        } catch (error) {
            console.warn('Erro ao validar datas:', error);
            if (typeof showToast === 'function') {
                showToast('error', 'Validação', 'Erro ao validar as datas. Verifique os valores inseridos.');
            }
            isValid = false;
        }
    }
    
    const atrasosMinutos = document.getElementById('atrasos-minutos');
    const faltasDias = document.getElementById('faltas-dias');
    const horasExtras = document.getElementById('horas-extras');
    
    if (atrasosMinutos && parseInt(atrasosMinutos.value) < 0) {
        atrasosMinutos.style.borderColor = '#e74c3c';
        if (typeof showToast === 'function') {
            showToast('error', 'Validação', 'Atrasos não pode ser negativo!');
        }
        isValid = false;
    }
    
    if (faltasDias && parseInt(faltasDias.value) < 0) {
        faltasDias.style.borderColor = '#e74c3c';
        if (typeof showToast === 'function') {
            showToast('error', 'Validação', 'Faltas não pode ser negativo!');
        }
        isValid = false;
    }
    
    if (horasExtras && parseFloat(horasExtras.value) < 0) {
        horasExtras.style.borderColor = '#e74c3c';
        if (typeof showToast === 'function') {
            showToast('error', 'Validação', 'Horas extras não pode ser negativo!');
        }
        isValid = false;
    }
    
    if (!isValid && typeof showToast === 'function') {
        showToast('error', 'Validação', 'Preencha todos os campos obrigatórios corretamente!');
    }
    
    return isValid;
}


function loadDetalhesRescisaoData() {
    const savedData = localStorage.getItem('detalhesRescisaoDraft');
    
    if (savedData) {
        try {
            const data = JSON.parse(savedData);
            
            Object.keys(data).forEach(key => {
                const field = document.querySelector(`[name="${key}"]`);
                if (field && data[key] !== undefined && data[key] !== null) {
                    field.value = data[key];
                }
            });
            
            const funcionario = document.getElementById('funcionario-detalhes');
            if (funcionario && funcionario.value) {
                funcionario.dispatchEvent(new Event('change'));
            }
            
            if (typeof showToast === 'function') {
                showToast('info', 'Dados Carregados', 'Rascunho dos detalhes carregado!');
            }
        } catch (error) {
            console.warn('Erro ao carregar dados dos detalhes:', error);
        }
    }
}


function updateSaveStatus(message) {
    const saveStatus = document.getElementById('saveStatus');
    if (saveStatus) {
        const span = saveStatus.querySelector('span');
        if (span) {
            span.textContent = message;
        }
        
        saveStatus.style.animation = 'pulse 0.5s ease-in-out';
        setTimeout(() => {
            if (saveStatus) {
                saveStatus.style.animation = '';
            }
        }, 500);
    }
}

// ===== FORMULÁRIO DE ALOCAÇÕES =====


function openAlocacoesForm() {
    console.log('Abrindo formulário de alocações');
    
    const targetContainer = document.getElementById('modal-container-solicitacoes') || 
                           document.getElementById('modal-container') ||
                           modalContainer;
    
    if (!targetContainer) {
        console.error('Container de modal não encontrado!');
        if (typeof showToast === 'function') {
            showToast('error', 'Erro', 'Erro ao abrir formulário. Tente novamente.');
        }
        return;
    }
    
    const formHTML = `
        <div class="modal-overlay" id="alocacoesModalOverlay">
            <div class="modal-content alocacoes-form" onclick="event.stopPropagation()">
                <div class="modal-header">
                    <h2><i class="fas fa-map-marker-alt"></i> Gerenciar Alocações</h2>
                    <button class="close-btn" id="alocacoesCloseBtn">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div class="auto-save-indicator">
                    <i class="fas fa-save"></i>
                    <span> Dados salvos automaticamente</span>
                    <div class="save-status" id="saveStatus">
                        <i class="fas fa-check-circle"></i>
                        <span>Salvo</span>
                    </div>
                </div>

                <div class="form-description">
                    <p><i class="fas fa-info-circle"></i> Cadastre e gerencie as obras e serviços onde os funcionários podem ser alocados.</p>
                </div>

                <form class="alocacoes-form-content" id="alocacoesForm">
                    <div class="alocacoes-container" id="alocacoesContainer">
                        <!-- Alocações serão adicionadas dinamicamente -->
                    </div>
                    
                    <div class="add-alocacao-section">
                        <button type="button" class="btn-add-alocacao" id="addAlocacaoBtn">
                            <i class="fas fa-plus"></i> Adicionar Nova Alocação
                        </button>
                    </div>
                    
                    <!-- Resumo das Alocações -->
                    <div class="alocacoes-resumo">
                        <div class="info-card">
                            <h4><i class="fas fa-list-alt"></i> Resumo das Alocações</h4>
                            <div class="resumo-content" id="resumoAlocacoes">
                                <p class="no-alocacoes">Nenhuma alocação cadastrada</p>
                            </div>
                        </div>
                    </div>
                </form>

                <div class="modal-footer">
                    <button type="button" class="btn-secondary" id="alocacoesCancelBtn">
                        <i class="fas fa-times"></i> Cancelar
                    </button>
                    <button type="button" class="btn-primary" id="alocacoesSaveBtn">
                        <i class="fas fa-save"></i> Salvar Rascunho
                    </button>
                    <button type="button" class="btn-success" id="alocacoesSubmitBtn">
                        <i class="fas fa-paper-plane"></i> Enviar
                    </button>
                </div>
            </div>
        </div>
    `;
    
    targetContainer.innerHTML = formHTML;
    
    
    setTimeout(() => {
        const closeBtn = document.getElementById('alocacoesCloseBtn');
        if (closeBtn) {
            closeBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Botão X clicado');
                closeAlocacoesModal();
            });
        }
        
        const cancelBtn = document.getElementById('alocacoesCancelBtn');
        if (cancelBtn) {
            cancelBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Botão Cancelar clicado');
                closeAlocacoesModal();
            });
        }
        
        const saveBtn = document.getElementById('alocacoesSaveBtn');
        if (saveBtn) {
            saveBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Botão Salvar clicado');
                saveAlocacoesDraft();
            });
        }
        
        const submitBtn = document.getElementById('alocacoesSubmitBtn');
        if (submitBtn) {
            submitBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Botão Enviar clicado');
                submitAlocacoesData();
            });
        }
        
        const addAlocacaoBtn = document.getElementById('addAlocacaoBtn');
        if (addAlocacaoBtn) {
            addAlocacaoBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Botão Adicionar Alocação clicado');
                addAlocacao();
            });
        }
        
        const overlay = document.getElementById('alocacoesModalOverlay');
        if (overlay) {
            overlay.addEventListener('click', function(e) {
                if (e.target === overlay) {
                    console.log('Overlay clicado');
                    closeAlocacoesModal();
                }
            });
        }
        
    }, 100); 
    
    if (typeof initializeAlocacoesForm === 'function') {
        initializeAlocacoesForm();
    }
    
    if (typeof startAutoSave === 'function') {
        startAutoSave();
    }
}

function closeAlocacoesModal() {
    console.log('Fechando modal de alocações...');
    
    if (window.autoSaveInterval) {
        clearInterval(window.autoSaveInterval);
        window.autoSaveInterval = null;
    }
    
    const containers = [
        document.getElementById('modal-container'),
        document.getElementById('modal-container-solicitacoes'),
        document.getElementById('modal-container-fiscal')
    ];
    
    containers.forEach(container => {
        if (container) {
            container.innerHTML = '';
        }
    });
    
    const overlay = document.getElementById('alocacoesModalOverlay');
    if (overlay && overlay.parentElement) {
        overlay.parentElement.removeChild(overlay);
    }
    
    console.log('Modal de alocações fechado');
}


function initializeAlocacoesForm() {
    console.log('Inicializando formulário de alocações');
    
    try {
        loadAlocacoesData();
        
        const container = document.getElementById('alocacoesContainer');
        if (container && container.children.length === 0) {
            addAlocacao();
        }
        
        updateResumoAlocacoes();
        
        console.log('Formulário de alocações inicializado com sucesso');
    } catch (error) {
        console.error('Erro ao inicializar formulário de alocações:', error);
    }
}


function addAlocacao() {
    const container = document.getElementById('alocacoesContainer');
    if (!container) return;
    
    const alocacaoCount = container.children.length + 1;
    
    const alocacaoHTML = `
        <div class="alocacao-card" data-alocacao="${alocacaoCount}">
            <div class="alocacao-header">
                <h3><i class="fas fa-building"></i> Alocação ${alocacaoCount}</h3>
                <button type="button" class="btn-remove-alocacao" data-alocacao-number="${alocacaoCount}" title="Remover alocação">
                    <i class="fas fa-trash"></i> Remover
                </button>
            </div>
            
            <div class="alocacao-form-grid">
                <div class="form-group full-width">
                    <label for="nome-obra-${alocacaoCount}">Nome da Obra/Serviço </label>
                    <input type="text" 
                           id="nome-obra-${alocacaoCount}" 
                           name="alocacoes[${alocacaoCount}][nome]" 
                           placeholder="Nome da obra ou serviço"
                           required>
                </div>
                
                <div class="form-group">
                    <label for="cnpj-cno-${alocacaoCount}">CNPJ/CNO </label>
                    <input type="text" 
                           id="cnpj-cno-${alocacaoCount}" 
                           name="alocacoes[${alocacaoCount}][cnpjCno]" 
                           placeholder="00.000.000/0000-00"
                           class="cnpj-mask"
                           required>
                </div>
                
                <div class="form-group">
                    <label for="tipo-alocacao-${alocacaoCount}">Tipo de Alocação</label>
                    <select id="tipo-alocacao-${alocacaoCount}" 
                            name="alocacoes[${alocacaoCount}][tipo]">
                        <option value="">Selecione o tipo...</option>
                        <option value="obra-civil">Obra Civil</option>
                        <option value="obra-industrial">Obra Industrial</option>
                        <option value="obra-residencial">Obra Residencial</option>
                        <option value="obra-comercial">Obra Comercial</option>
                        <option value="servico-manutencao">Serviço de Manutenção</option>
                        <option value="servico-consultoria">Serviço de Consultoria</option>
                        <option value="servico-terceirizado">Serviço Terceirizado</option>
                        <option value="projeto-temporario">Projeto Temporário</option>
                        <option value="contrato-continuo">Contrato Contínuo</option>
                        <option value="outros">Outros</option>
                    </select>
                </div>
                
                <div class="form-group full-width">
                    <label for="endereco-obra-${alocacaoCount}">Endereço da Obra/Serviço </label>
                    <textarea id="endereco-obra-${alocacaoCount}" 
                              name="alocacoes[${alocacaoCount}][endereco]" 
                              rows="3" 
                              placeholder="Endereço completo da obra ou serviço"
                              required></textarea>
                </div>
                
                <div class="form-group">
                    <label for="data-inicio-${alocacaoCount}">Data de Início</label>
                    <input type="date" 
                           id="data-inicio-${alocacaoCount}" 
                           name="alocacoes[${alocacaoCount}][dataInicio]">
                </div>
                
                <div class="form-group">
                    <label for="data-previsao-fim-${alocacaoCount}">Previsão de Término</label>
                    <input type="date" 
                           id="data-previsao-fim-${alocacaoCount}" 
                           name="alocacoes[${alocacaoCount}][dataPrevisaoFim]">
                </div>
                
                <div class="form-group">
                    <label for="status-alocacao-${alocacaoCount}">Status</label>
                    <select id="status-alocacao-${alocacaoCount}" 
                            name="alocacoes[${alocacaoCount}][status]">
                        <option value="ativa">Ativa</option>
                        <option value="planejada">Planejada</option>
                        <option value="suspensa">Suspensa</option>
                        <option value="finalizada">Finalizada</option>
                        <option value="cancelada">Cancelada</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="responsavel-${alocacaoCount}">Responsável</label>
                    <input type="text" 
                           id="responsavel-${alocacaoCount}" 
                           name="alocacoes[${alocacaoCount}][responsavel]" 
                           placeholder="Nome do responsável">
                </div>
                
                <div class="form-group full-width">
                    <label for="observacoes-${alocacaoCount}">Observações</label>
                    <textarea id="observacoes-${alocacaoCount}" 
                              name="alocacoes[${alocacaoCount}][observacoes]" 
                              rows="2" 
                              placeholder="Informações adicionais sobre a alocação"></textarea>
                </div>
            </div>
        </div>
    `;
    
    container.insertAdjacentHTML('beforeend', alocacaoHTML);
    
    setTimeout(() => {
        const removeBtn = container.querySelector(`[data-alocacao-number="${alocacaoCount}"]`);
        if (removeBtn) {
            removeBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log(`Botão remover alocação ${alocacaoCount} clicado`);
                removeAlocacao(this);
            });
        }
    }, 50);
    
    setupAlocacaoMasks();
    
    setupAlocacaoEvents(alocacaoCount);
    
    if (typeof showToast === 'function') {
        showToast('success', 'Alocação', `Alocação ${alocacaoCount} adicionada com sucesso!`);
    }
    
    updateResumoAlocacoes();
    
    if (typeof triggerAutoSave === 'function') {
        triggerAutoSave();
    }
}


function removeAlocacao(button) {
    const alocacaoCard = button.closest('.alocacao-card');
    if (!alocacaoCard) return;
    
    const alocacaoNumber = alocacaoCard.dataset.alocacao;
    
    const container = document.getElementById('alocacoesContainer');
    if (!container || container.children.length === 1) {
        if (typeof showToast === 'function') {
            showToast('warning', 'Atenção', 'Deve haver pelo menos uma alocação!');
        }
        return;
    }
    
    if (confirm(`Tem certeza que deseja remover a Alocação ${alocacaoNumber}?`)) {
        alocacaoCard.remove();
        
        renumberAlocacoes();
        
        if (typeof showToast === 'function') {
            showToast('info', 'Alocação', `Alocação ${alocacaoNumber} removida com sucesso!`);
        }
        
        updateResumoAlocacoes();
        
        if (typeof triggerAutoSave === 'function') {
            triggerAutoSave();
        }
    }
}


function renumberAlocacoes() {
    const alocacaoCards = document.querySelectorAll('.alocacao-card');
    
    alocacaoCards.forEach((card, index) => {
        const newNumber = index + 1;
        const oldNumber = card.dataset.alocacao;
        
        card.dataset.alocacao = newNumber;
        
        const header = card.querySelector('.alocacao-header h3');
        if (header) {
            header.innerHTML = `<i class="fas fa-building"></i> Alocação ${newNumber}`;
        }
        
        const removeBtn = card.querySelector('.btn-remove-alocacao');
        if (removeBtn) {
            removeBtn.setAttribute('data-alocacao-number', newNumber);
        }
        
        const inputs = card.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            if (input.id) {
                input.id = input.id.replace(`-${oldNumber}`, `-${newNumber}`);
            }
            if (input.name) {
                input.name = input.name.replace(`[${oldNumber}]`, `[${newNumber}]`);
            }
        });
        
        const labels = card.querySelectorAll('label');
        labels.forEach(label => {
            if (label.getAttribute('for')) {
                label.setAttribute('for', label.getAttribute('for').replace(`-${oldNumber}`, `-${newNumber}`));
            }
        });
    });
}


function setupAlocacaoMasks() {
    const cnpjInputs = document.querySelectorAll('.cnpj-mask');
    cnpjInputs.forEach(input => {
        if (!input.dataset.maskApplied) {
            input.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                value = value.replace(/(\d{2})(\d)/, '$1.$2');
                value = value.replace(/(\d{3})(\d)/, '$1.$2');
                value = value.replace(/(\d{3})(\d)/, '$1/$2');
                value = value.replace(/(\d{4})(\d)/, '$1-$2');
                e.target.value = value;
            });
            input.dataset.maskApplied = 'true';
        }
    });
}


function setupAlocacaoEvents(alocacaoCount) {
    const inputs = document.querySelectorAll(`[name*="alocacoes[${alocacaoCount}]"]`);
    inputs.forEach(input => {
        input.addEventListener('change', function() {
            updateResumoAlocacoes();
            if (typeof triggerAutoSave === 'function') {
                triggerAutoSave();
            }
        });
        
        input.addEventListener('input', function() {
            if (typeof triggerAutoSave === 'function') {
                triggerAutoSave();
            }
        });
    });
    
    const cnpjInput = document.getElementById(`cnpj-cno-${alocacaoCount}`);
    if (cnpjInput) {
        cnpjInput.addEventListener('blur', function() {
            if (this.value && !isValidCNPJ(this.value)) {
                this.style.borderColor = '#e74c3c';
                if (typeof showToast === 'function') {
                    showToast('warning', 'CNPJ Inválido', 'Verifique o CNPJ/CNO informado.');
                }
            } else {
                this.style.borderColor = '';
            }
        });
    }
    
    const dataInicio = document.getElementById(`data-inicio-${alocacaoCount}`);
    const dataFim = document.getElementById(`data-previsao-fim-${alocacaoCount}`);
    
    if (dataInicio) {
        dataInicio.addEventListener('change', function() {
            if (dataFim && dataFim.value && this.value > dataFim.value) {
                dataFim.value = '';
                if (typeof showToast === 'function') {
                    showToast('warning', 'Data Inválida', 'Data de fim deve ser posterior ao início!');
                }
            }
            if (dataFim) {
                dataFim.min = this.value;
            }
        });
    }
    
    if (dataFim) {
        dataFim.addEventListener('change', function() {
            if (dataInicio && dataInicio.value && this.value < dataInicio.value) {
                this.value = '';
                if (typeof showToast === 'function') {
                    showToast('warning', 'Data Inválida', 'Data de fim deve ser posterior ao início!');
                }
            }
        });
    }
}


function updateResumoAlocacoes() {
    const alocacaoCards = document.querySelectorAll('.alocacao-card');
    const resumoDiv = document.getElementById('resumoAlocacoes');
    
    if (!resumoDiv) return;
    
    if (alocacaoCards.length === 0) {
        resumoDiv.innerHTML = '<p class="no-alocacoes">Nenhuma alocação cadastrada</p>';
        return;
    }
    
    let resumoHTML = `
        <div class="resumo-stats">
            <div class="stat-item">
                <div class="stat-number">${alocacaoCards.length}</div>
                <div class="stat-label">Total de Alocações</div>
            </div>
        </div>
        <div class="alocacoes-list">
    `;
    
    alocacaoCards.forEach((card, index) => {
        const numero = index + 1;
        const nomeInput = card.querySelector(`input[name*="[nome]"]`);
        const cnpjInput = card.querySelector(`input[name*="[cnpjCno]"]`);
        const tipoSelect = card.querySelector(`select[name*="[tipo]"]`);
        const statusSelect = card.querySelector(`select[name*="[status]"]`);
        const enderecoTextarea = card.querySelector(`textarea[name*="[endereco]"]`);
        
        const nome = nomeInput ? nomeInput.value || 'Sem nome' : 'Sem nome';
        const cnpj = cnpjInput ? cnpjInput.value || 'Não informado' : 'Não informado';
        const tipo = tipoSelect ? tipoSelect.value || 'Não especificado' : 'Não especificado';
        const status = statusSelect ? statusSelect.value || 'ativa' : 'ativa';
        const endereco = enderecoTextarea ? enderecoTextarea.value || 'Endereço não informado' : 'Endereço não informado';
        
        const statusClass = getStatusClass(status);
        const statusText = getStatusText(status);
        const tipoText = getTipoText(tipo);
        
        resumoHTML += `
            <div class="alocacao-item">
                <div class="alocacao-info">
                    <div class="alocacao-title">
                        <strong>${nome}</strong>
                        <span class="status-badge ${statusClass}">${statusText}</span>
                    </div>
                    <div class="alocacao-details">
                        <div class="detail-item">
                            <i class="fas fa-file-alt"></i>
                            <span>CNPJ/CNO: ${cnpj}</span>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-tag"></i>
                            <span>Tipo: ${tipoText}</span>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>${endereco.substring(0, 60)}${endereco.length > 60 ? '...' : ''}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    
    resumoHTML += '</div>';
    
    const statusCount = {};
    alocacaoCards.forEach(card => {
        const statusSelect = card.querySelector(`select[name*="[status]"]`);
        const status = statusSelect ? statusSelect.value || 'ativa' : 'ativa';
        statusCount[status] = (statusCount[status] || 0) + 1;
    });
    
    if (Object.keys(statusCount).length > 1) {
        resumoHTML += '<div class="status-breakdown">';
        resumoHTML += '<h5><i class="fas fa-chart-pie"></i> Distribuição por Status</h5>';
        resumoHTML += '<div class="status-stats">';
        
        Object.keys(statusCount).forEach(status => {
            const statusClass = getStatusClass(status);
            const statusText = getStatusText(status);
            resumoHTML += `
                <div class="status-stat">
                    <span class="status-badge ${statusClass}">${statusText}</span>
                    <span class="status-count">${statusCount[status]}</span>
                </div>
            `;
        });
        
        resumoHTML += '</div></div>';
    }
    
    resumoDiv.innerHTML = resumoHTML;
}


function getStatusClass(status) {
    const statusMap = {
        'ativa': 'success',
        'planejada': 'info',
        'suspensa': 'warning',
        'finalizada': 'secondary',
        'cancelada': 'danger'
    };
    return statusMap[status] || 'info';
}


function getStatusText(status) {
    const statusMap = {
        'ativa': 'Ativa',
        'planejada': 'Planejada',
        'suspensa': 'Suspensa',
        'finalizada': 'Finalizada',
        'cancelada': 'Cancelada'
    };
    return statusMap[status] || 'Ativa';
}


function getTipoText(tipo) {
    const tipoMap = {
        'obra-civil': 'Obra Civil',
        'obra-industrial': 'Obra Industrial',
        'obra-residencial': 'Obra Residencial',
        'obra-comercial': 'Obra Comercial',
        'servico-manutencao': 'Serviço de Manutenção',
        'servico-consultoria': 'Serviço de Consultoria',
        'servico-terceirizado': 'Serviço Terceirizado',
        'projeto-temporario': 'Projeto Temporário',
        'contrato-continuo': 'Contrato Contínuo',
        'outros': 'Outros'
    };
    return tipoMap[tipo] || 'Não especificado';
}


function isValidCNPJ(cnpj) {
    cnpj = cnpj.replace(/[^\d]/g, '');
    
    if (cnpj.length !== 14) return false;
    
    if (/^(\d)\1{13}$/.test(cnpj)) return false;
    
    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    let digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;
    
    for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) pos = 9;
    }
    
    let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado !== parseInt(digitos.charAt(0))) return false;
    
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    
    for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) pos = 9;
    }
    
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado !== parseInt(digitos.charAt(1))) return false;
    
    return true;
}


function saveAlocacoesDraft() {
    const formData = collectAlocacoesData();
    
    localStorage.setItem('alocacoesDraft', JSON.stringify(formData));
    
    if (typeof showToast === 'function') {
        showToast('success', 'Rascunho', 'Alocações salvas como rascunho!');
    }
    
    if (typeof updateSaveStatus === 'function') {
        updateSaveStatus('Rascunho salvo');
    }
}


function submitAlocacoesData() {
    if (!validateAlocacoesForm()) {
        return;
    }
    
    const formData = collectAlocacoesData();
    
    if (typeof showToast === 'function') {
        showToast('info', 'Envio', 'Enviando dados das alocações...');
    }
    
    setTimeout(() => {
        localStorage.removeItem('alocacoesDraft');
        
        if (typeof showToast === 'function') {
            showToast('success', 'Sucesso', 'Alocações enviadas com sucesso!');
        }
        
        setTimeout(() => {
            closeAlocacoesModal();
        }, 1500);
    }, 2000);
}


function collectAlocacoesData() {
    const alocacaoCards = document.querySelectorAll('.alocacao-card');
    const alocacoes = [];
    
    alocacaoCards.forEach((card, index) => {
        const nomeInput = card.querySelector(`input[name*="[nome]"]`);
        const cnpjInput = card.querySelector(`input[name*="[cnpjCno]"]`);
        const tipoSelect = card.querySelector(`select[name*="[tipo]"]`);
        const enderecoTextarea = card.querySelector(`textarea[name*="[endereco]"]`);
        const dataInicioInput = card.querySelector(`input[name*="[dataInicio]"]`);
        const dataFimInput = card.querySelector(`input[name*="[dataPrevisaoFim]"]`);
        const statusSelect = card.querySelector(`select[name*="[status]"]`);
        const responsavelInput = card.querySelector(`input[name*="[responsavel]"]`);
        const observacoesTextarea = card.querySelector(`textarea[name*="[observacoes]"]`);
        
        const alocacao = {
            numero: index + 1,
            nome: nomeInput ? nomeInput.value : '',
            cnpjCno: cnpjInput ? cnpjInput.value : '',
            tipo: tipoSelect ? tipoSelect.value : '',
            endereco: enderecoTextarea ? enderecoTextarea.value : '',
            dataInicio: dataInicioInput ? dataInicioInput.value : '',
            dataPrevisaoFim: dataFimInput ? dataFimInput.value : '',
            status: statusSelect ? statusSelect.value : '',
            responsavel: responsavelInput ? responsavelInput.value : '',
            observacoes: observacoesTextarea ? observacoesTextarea.value : ''
        };
        
        alocacoes.push(alocacao);
    });
    
    return {
        alocacoes: alocacoes,
        timestamp: new Date().toISOString()
    };
}


function validateAlocacoesForm() {
    const alocacaoCards = document.querySelectorAll('.alocacao-card');
    
    if (alocacaoCards.length === 0) {
        if (typeof showToast === 'function') {
            showToast('warning', 'Validação', 'Adicione pelo menos uma alocação!');
        }
        return false;
    }
    
    let isValid = true;
    
    alocacaoCards.forEach((card, index) => {
        const requiredFields = card.querySelectorAll('input[required], textarea[required]');
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.style.borderColor = '#e74c3c';
                isValid = false;
            } else {
                field.style.borderColor = '';
            }
        });
        
        const cnpjField = card.querySelector('input[name*="[cnpjCno]"]');
        if (cnpjField && cnpjField.value && !isValidCNPJ(cnpjField.value)) {
            cnpjField.style.borderColor = '#e74c3c';
            if (typeof showToast === 'function') {
                showToast('error', 'Validação', `CNPJ/CNO da Alocação ${index + 1} é inválido!`);
            }
            isValid = false;
        }
        
        const dataInicio = card.querySelector('input[name*="[dataInicio]"]');
        const dataFim = card.querySelector('input[name*="[dataPrevisaoFim]"]');
        
        if (dataInicio && dataFim && dataInicio.value && dataFim.value && dataInicio.value > dataFim.value) {
            dataFim.style.borderColor = '#e74c3c';
            if (typeof showToast === 'function') {
                showToast('error', 'Validação', `Data de fim da Alocação ${index + 1} deve ser posterior ao início!`);
            }
            isValid = false;
        }
    });
    
    if (!isValid && typeof showToast === 'function') {
        showToast('error', 'Validação', 'Preencha todos os campos obrigatórios corretamente!');
    }
    
    return isValid;
}


function loadAlocacoesData() {
    const savedData = localStorage.getItem('alocacoesDraft');
    
    if (savedData) {
        try {
            const data = JSON.parse(savedData);
            
            if (data.alocacoes && data.alocacoes.length > 0) {
                const container = document.getElementById('alocacoesContainer');
                if (container) {
                    container.innerHTML = '';
                    
                    data.alocacoes.forEach((alocacao, index) => {
                        addAlocacao();
                        
                        setTimeout(() => {
                            const card = container.children[index];
                            if (card) {
                                const nomeInput = card.querySelector(`input[name*="[nome]"]`);
                                const cnpjInput = card.querySelector(`input[name*="[cnpjCno]"]`);
                                const tipoSelect = card.querySelector(`select[name*="[tipo]"]`);
                                const enderecoTextarea = card.querySelector(`textarea[name*="[endereco]"]`);
                                const dataInicioInput = card.querySelector(`input[name*="[dataInicio]"]`);
                                const dataFimInput = card.querySelector(`input[name*="[dataPrevisaoFim]"]`);
                                const statusSelect = card.querySelector(`select[name*="[status]"]`);
                                const responsavelInput = card.querySelector(`input[name*="[responsavel]"]`);
                                const observacoesTextarea = card.querySelector(`textarea[name*="[observacoes]"]`);
                                
                                if (nomeInput) nomeInput.value = alocacao.nome || '';
                                if (cnpjInput) cnpjInput.value = alocacao.cnpjCno || '';
                                if (tipoSelect) tipoSelect.value = alocacao.tipo || '';
                                if (enderecoTextarea) enderecoTextarea.value = alocacao.endereco || '';
                                if (dataInicioInput) dataInicioInput.value = alocacao.dataInicio || '';
                                if (dataFimInput) dataFimInput.value = alocacao.dataPrevisaoFim || '';
                                if (statusSelect) statusSelect.value = alocacao.status || 'ativa';
                                if (responsavelInput) responsavelInput.value = alocacao.responsavel || '';
                                if (observacoesTextarea) observacoesTextarea.value = alocacao.observacoes || '';
                            }
                        }, 100 * index);
                    });
                    
                    if (typeof showToast === 'function') {
                        showToast('info', 'Dados Carregados', 'Rascunho das alocações carregado!');
                    }
                }
            }
        } catch (error) {
            console.warn('Erro ao carregar dados das alocações:', error);
        }
    }
}


function updateSaveStatus(message) {
    const saveStatus = document.getElementById('saveStatus');
    if (saveStatus) {
        const span = saveStatus.querySelector('span');
        if (span) {
            span.textContent = message;
        }
        
        saveStatus.style.animation = 'pulse 0.5s ease-in-out';
        setTimeout(() => {
            if (saveStatus) {
                saveStatus.style.animation = '';
            }
        }, 500);
    }
}

// ===== FORMULÁRIO DE ALOCAÇÃO DE FUNCIONÁRIOS =====


function openAlocacaoFuncionariosForm() {
    console.log('Abrindo formulário de alocação de funcionários');
    
    const targetContainer = document.getElementById('modal-container-solicitacoes') || 
                           document.getElementById('modal-container') ||
                           modalContainer;
    
    if (!targetContainer) {
        console.error('Container de modal não encontrado!');
        if (typeof showToast === 'function') {
            showToast('error', 'Erro', 'Erro ao abrir formulário. Tente novamente.');
        }
        return;
    }
    
    const formHTML = `
        <div class="modal-overlay" id="alocacaoFuncionariosModalOverlay">
            <div class="modal-content alocacao-funcionarios-form" onclick="event.stopPropagation()">
                <div class="modal-header">
                    <h2><i class="fas fa-users-cog"></i> Alocação de Funcionários</h2>
                    <button class="close-btn" id="alocacaoFuncionariosCloseBtn">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div class="auto-save-indicator">
                    <i class="fas fa-save"></i>
                    <span> Dados salvos automaticamente</span>
                    <div class="save-status" id="saveStatus">
                        <i class="fas fa-check-circle"></i>
                        <span>Salvo</span>
                    </div>
                </div>

                <div class="form-description">
                    <p><i class="fas fa-info-circle"></i> Gerencie a alocação de funcionários em obras e serviços específicos.</p>
                </div>

                <form class="alocacao-funcionarios-form-content" id="alocacaoFuncionariosForm">
                    <div class="alocacoes-funcionarios-container" id="alocacoesFuncionariosContainer">
                        <!-- Alocações de funcionários serão adicionadas dinamicamente -->
                    </div>
                    
                    <div class="add-alocacao-funcionario-section">
                        <button type="button" class="btn-add-alocacao-funcionario" id="addAlocacaoFuncionarioBtn">
                            <i class="fas fa-plus"></i> Adicionar Alocação de Funcionário
                        </button>
                    </div>
                    
                    <!-- Resumo das Alocações de Funcionários -->
                    <div class="alocacoes-funcionarios-resumo">
                        <div class="info-card">
                            <h4><i class="fas fa-chart-bar"></i> Resumo das Alocações</h4>
                            <div class="resumo-content" id="resumoAlocacoesFuncionarios">
                                <p class="no-alocacoes">Nenhuma alocação de funcionário cadastrada</p>
                            </div>
                        </div>
                    </div>
                </form>

                <div class="modal-footer">
                    <button type="button" class="btn-secondary" id="alocacaoFuncionariosCancelBtn">
                        <i class="fas fa-times"></i> Cancelar
                    </button>
                    <button type="button" class="btn-primary" id="alocacaoFuncionariosSaveBtn">
                        <i class="fas fa-save"></i> Salvar Rascunho
                    </button>
                    <button type="button" class="btn-success" id="alocacaoFuncionariosSubmitBtn">
                        <i class="fas fa-paper-plane"></i> Enviar
                    </button>
                </div>
            </div>
        </div>
    `;
    
    targetContainer.innerHTML = formHTML;
    
    
    setTimeout(() => {
        const closeBtn = document.getElementById('alocacaoFuncionariosCloseBtn');
        if (closeBtn) {
            closeBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Botão X clicado');
                closeAlocacaoFuncionariosModal();
            });
        }
        
        const cancelBtn = document.getElementById('alocacaoFuncionariosCancelBtn');
        if (cancelBtn) {
            cancelBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Botão Cancelar clicado');
                closeAlocacaoFuncionariosModal();
            });
        }
        
        const saveBtn = document.getElementById('alocacaoFuncionariosSaveBtn');
        if (saveBtn) {
            saveBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Botão Salvar clicado');
                saveAlocacaoFuncionariosDraft();
            });
        }
        
        const submitBtn = document.getElementById('alocacaoFuncionariosSubmitBtn');
        if (submitBtn) {
            submitBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Botão Enviar clicado');
                submitAlocacaoFuncionariosData();
            });
        }
        
        const addAlocacaoFuncionarioBtn = document.getElementById('addAlocacaoFuncionarioBtn');
        if (addAlocacaoFuncionarioBtn) {
            addAlocacaoFuncionarioBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Botão Adicionar Alocação de Funcionário clicado');
                addAlocacaoFuncionario();
            });
        }
        
        const overlay = document.getElementById('alocacaoFuncionariosModalOverlay');
        if (overlay) {
            overlay.addEventListener('click', function(e) {
                if (e.target === overlay) {
                    console.log('Overlay clicado');
                    closeAlocacaoFuncionariosModal();
                }
            });
        }
        
    }, 100); 
    
    if (typeof initializeAlocacaoFuncionariosForm === 'function') {
        initializeAlocacaoFuncionariosForm();
    }
    
    if (typeof startAutoSave === 'function') {
        startAutoSave();
    }
}

function closeAlocacaoFuncionariosModal() {
    console.log('Fechando modal de alocação de funcionários...');
    
    if (window.autoSaveInterval) {
        clearInterval(window.autoSaveInterval);
        window.autoSaveInterval = null;
    }
    
    const containers = [
        document.getElementById('modal-container'),
        document.getElementById('modal-container-solicitacoes'),
        document.getElementById('modal-container-fiscal')
    ];
    
    containers.forEach(container => {
        if (container) {
            container.innerHTML = '';
        }
    });
    
    const overlay = document.getElementById('alocacaoFuncionariosModalOverlay');
    if (overlay && overlay.parentElement) {
        overlay.parentElement.removeChild(overlay);
    }
    
    console.log('Modal de alocação de funcionários fechado');
}


function initializeAlocacaoFuncionariosForm() {
    console.log('Inicializando formulário de alocação de funcionários');
    
    try {
        loadAlocacaoFuncionariosData();
        
        const container = document.getElementById('alocacoesFuncionariosContainer');
        if (container && container.children.length === 0) {
            addAlocacaoFuncionario();
        }
        
        updateResumoAlocacoesFuncionarios();
        
        console.log('Formulário de alocação de funcionários inicializado com sucesso');
    } catch (error) {
        console.error('Erro ao inicializar formulário de alocação de funcionários:', error);
    }
}


function addAlocacaoFuncionario() {
    const container = document.getElementById('alocacoesFuncionariosContainer');
    if (!container) return;
    
    const alocacaoCount = container.children.length + 1;
    
    const alocacaoHTML = `
        <div class="alocacao-funcionario-card" data-alocacao="${alocacaoCount}">
            <div class="alocacao-funcionario-header">
                <h3><i class="fas fa-user-tie"></i> Alocação de Funcionário ${alocacaoCount}</h3>
                <button type="button" class="btn-remove-alocacao-funcionario" data-alocacao-funcionario-number="${alocacaoCount}" title="Remover alocação">
                    <i class="fas fa-trash"></i> Remover
                </button>
            </div>
            
            <div class="alocacao-funcionario-form-grid">
                <div class="form-group">
                    <label for="funcionario-${alocacaoCount}">Nome do Funcionário </label>
                    <select id="funcionario-${alocacaoCount}" 
                            name="alocacoesFuncionarios[${alocacaoCount}][funcionario]" 
                            required>
                        <option value="">Selecione o funcionário...</option>
                        <option value="joao-silva">João Silva - Analista</option>
                        <option value="maria-santos">Maria Santos - Coordenadora</option>
                        <option value="pedro-oliveira">Pedro Oliveira - Desenvolvedor</option>
                        <option value="ana-costa">Ana Costa - Designer</option>
                        <option value="carlos-ferreira">Carlos Ferreira - Gerente</option>
                        <option value="lucia-martins">Lúcia Martins - Assistente</option>
                        <option value="ricardo-alves">Ricardo Alves - Técnico</option>
                        <option value="fernanda-lima">Fernanda Lima - Analista</option>
                        <option value="roberto-santos">Roberto Santos - Supervisor</option>
                        <option value="patricia-costa">Patrícia Costa - Consultora</option>
                        <option value="marcos-oliveira">Marcos Oliveira - Engenheiro</option>
                        <option value="juliana-pereira">Juliana Pereira - Arquiteta</option>
                        <option value="andre-silva">André Silva - Operador</option>
                        <option value="camila-rodrigues">Camila Rodrigues - Auxiliar</option>
                        <option value="leonardo-costa">Leonardo Costa - Especialista</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="obra-servico-${alocacaoCount}">Obra/Serviço </label>
                    <select id="obra-servico-${alocacaoCount}" 
                            name="alocacoesFuncionarios[${alocacaoCount}][obraServico]" 
                            required>
                        <option value="">Selecione a obra/serviço...</option>
                        <option value="obra-residencial-alpha">Obra Residencial Alpha - Condomínio</option>
                        <option value="obra-comercial-beta">Obra Comercial Beta - Shopping Center</option>
                        <option value="obra-industrial-gamma">Obra Industrial Gamma - Fábrica</option>
                        <option value="servico-manutencao-delta">Serviço de Manutenção Delta - Hospital</option>
                        <option value="projeto-consultoria-epsilon">Projeto Consultoria Epsilon - Banco</option>
                        <option value="obra-infraestrutura-zeta">Obra Infraestrutura Zeta - Rodovia</option>
                        <option value="servico-terceirizado-eta">Serviço Terceirizado Eta - Escola</option>
                        <option value="projeto-temporario-theta">Projeto Temporário Theta - Evento</option>
                        <option value="contrato-continuo-iota">Contrato Contínuo Iota - Prefeitura</option>
                        <option value="obra-reformas-kappa">Obra de Reformas Kappa - Escritório</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="data-inicio-${alocacaoCount}">Data de Início </label>
                    <input type="date" 
                           id="data-inicio-${alocacaoCount}" 
                           name="alocacoesFuncionarios[${alocacaoCount}][dataInicio]" 
                           required>
                </div>
                
                <div class="form-group">
                    <label for="data-termino-${alocacaoCount}">Data de Término/Troca</label>
                    <input type="date" 
                           id="data-termino-${alocacaoCount}" 
                           name="alocacoesFuncionarios[${alocacaoCount}][dataTermino]">
                </div>
                
                <div class="form-group">
                    <label for="funcao-${alocacaoCount}">Função na Obra/Serviço</label>
                    <select id="funcao-${alocacaoCount}" 
                            name="alocacoesFuncionarios[${alocacaoCount}][funcao]">
                        <option value="">Selecione a função...</option>
                        <option value="encarregado">Encarregado</option>
                        <option value="supervisor">Supervisor</option>
                        <option value="coordenador">Coordenador</option>
                        <option value="gerente-projeto">Gerente de Projeto</option>
                        <option value="engenheiro-obra">Engenheiro de Obra</option>
                        <option value="arquiteto">Arquiteto</option>
                        <option value="mestre-obras">Mestre de Obras</option>
                        <option value="tecnico-seguranca">Técnico de Segurança</option>
                        <option value="operador-equipamento">Operador de Equipamento</option>
                        <option value="auxiliar-geral">Auxiliar Geral</option>
                        <option value="consultor">Consultor</option>
                        <option value="especialista">Especialista</option>
                        <option value="analista">Analista</option>
                        <option value="assistente">Assistente</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="status-alocacao-${alocacaoCount}">Status da Alocação</label>
                    <select id="status-alocacao-${alocacaoCount}" 
                            name="alocacoesFuncionarios[${alocacaoCount}][status]">
                        <option value="ativa">Ativa</option>
                        <option value="planejada">Planejada</option>
                        <option value="suspensa">Suspensa</option>
                        <option value="finalizada">Finalizada</option>
                        <option value="transferida">Transferida</option>
                    </select>
                </div>
                
                <div class="form-group full-width">
                    <label for="observacoes-alocacao-${alocacaoCount}">Observações</label>
                    <textarea id="observacoes-alocacao-${alocacaoCount}" 
                              name="alocacoesFuncionarios[${alocacaoCount}][observacoes]" 
                              rows="3" 
                              placeholder="Informações adicionais sobre a alocação do funcionário"></textarea>
                </div>
                
                <!-- Informações da Alocação -->
                <div class="form-group full-width alocacao-info">
                    <div class="info-card-small">
                        <h5><i class="fas fa-info-circle"></i> Informações da Alocação</h5>
                        <div class="alocacao-details" id="alocacaoDetails-${alocacaoCount}">
                            <p>Preencha os dados para ver as informações</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    container.insertAdjacentHTML('beforeend', alocacaoHTML);
    
    setTimeout(() => {
        const removeBtn = container.querySelector(`[data-alocacao-funcionario-number="${alocacaoCount}"]`);
        if (removeBtn) {
            removeBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log(`Botão remover alocação de funcionário ${alocacaoCount} clicado`);
                removeAlocacaoFuncionario(this);
            });
        }
    }, 50);
    
    setupAlocacaoFuncionarioEvents(alocacaoCount);
    
    if (typeof showToast === 'function') {
        showToast('success', 'Alocação', `Alocação de Funcionário ${alocacaoCount} adicionada com sucesso!`);
    }
    
    updateResumoAlocacoesFuncionarios();
    
    if (typeof triggerAutoSave === 'function') {
        triggerAutoSave();
    }
}


function removeAlocacaoFuncionario(button) {
    const alocacaoCard = button.closest('.alocacao-funcionario-card');
    if (!alocacaoCard) return;
    
    const alocacaoNumber = alocacaoCard.dataset.alocacao;
    
    const container = document.getElementById('alocacoesFuncionariosContainer');
    if (!container || container.children.length === 1) {
        if (typeof showToast === 'function') {
            showToast('warning', 'Atenção', 'Deve haver pelo menos uma alocação de funcionário!');
        }
        return;
    }
    
    if (confirm(`Tem certeza que deseja remover a Alocação de Funcionário ${alocacaoNumber}?`)) {
        alocacaoCard.remove();
        
        renumberAlocacoesFuncionarios();
        
        if (typeof showToast === 'function') {
            showToast('info', 'Alocação', `Alocação de Funcionário ${alocacaoNumber} removida com sucesso!`);
        }
        
        updateResumoAlocacoesFuncionarios();
        
        if (typeof triggerAutoSave === 'function') {
            triggerAutoSave();
        }
    }
}


function renumberAlocacoesFuncionarios() {
    const alocacaoCards = document.querySelectorAll('.alocacao-funcionario-card');
    
    alocacaoCards.forEach((card, index) => {
        const newNumber = index + 1;
        const oldNumber = card.dataset.alocacao;
        
        card.dataset.alocacao = newNumber;
        
        const header = card.querySelector('.alocacao-funcionario-header h3');
        if (header) {
            header.innerHTML = `<i class="fas fa-user-tie"></i> Alocação de Funcionário ${newNumber}`;
        }
        
        const removeBtn = card.querySelector('.btn-remove-alocacao-funcionario');
        if (removeBtn) {
            removeBtn.setAttribute('data-alocacao-funcionario-number', newNumber);
        }
        
        const inputs = card.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            if (input.id) {
                input.id = input.id.replace(`-${oldNumber}`, `-${newNumber}`);
            }
            if (input.name) {
                input.name = input.name.replace(`[${oldNumber}]`, `[${newNumber}]`);
            }
        });
        
        const labels = card.querySelectorAll('label');
        labels.forEach(label => {
            if (label.getAttribute('for')) {
                label.setAttribute('for', label.getAttribute('for').replace(`-${oldNumber}`, `-${newNumber}`));
            }
        });
        
        const detailsContainer = card.querySelector('.alocacao-details');
        if (detailsContainer) {
            detailsContainer.id = `alocacaoDetails-${newNumber}`;
        }
    });
}


function setupAlocacaoFuncionarioEvents(alocacaoCount) {
    const funcionario = document.getElementById(`funcionario-${alocacaoCount}`);
    const obraServico = document.getElementById(`obra-servico-${alocacaoCount}`);
    const dataInicio = document.getElementById(`data-inicio-${alocacaoCount}`);
    const dataTermino = document.getElementById(`data-termino-${alocacaoCount}`);
    const funcao = document.getElementById(`funcao-${alocacaoCount}`);
    const status = document.getElementById(`status-alocacao-${alocacaoCount}`);
    const observacoes = document.getElementById(`observacoes-alocacao-${alocacaoCount}`);
    
    if (!funcionario || !obraServico || !dataInicio || !dataTermino || !funcao || !status || !observacoes) {
        console.warn('Alguns elementos da alocação não foram encontrados');
        return;
    }
    
    function updateAlocacaoDetails() {
        const detailsDiv = document.getElementById(`alocacaoDetails-${alocacaoCount}`);
        if (!detailsDiv) return;
        
        if (funcionario.value && obraServico.value && dataInicio.value) {
            const funcionarioText = funcionario.options[funcionario.selectedIndex].text;
            const obraServicoText = obraServico.options[obraServico.selectedIndex].text;
            const funcaoText = funcao.value ? funcao.options[funcao.selectedIndex].text : 'Não especificada';
            const statusText = getStatusText(status.value);
            const statusClass = getStatusClass(status.value);
            
            let duracaoInfo = '';
            if (dataTermino.value) {
                try {
                    const inicio = new Date(dataInicio.value + 'T00:00:00');
                    const termino = new Date(dataTermino.value + 'T00:00:00');
                    const diffTime = Math.abs(termino - inicio);
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                    duracaoInfo = `
                        <div class="detail-item">
                            <i class="fas fa-calendar-alt"></i>
                            <span>Duração: ${diffDays} dias</span>
                        </div>
                    `;
                } catch (error) {
                    console.warn('Erro ao calcular duração:', error);
                }
            }
            
            const conflictInfo = checkAlocacaoConflicts(funcionario.value, dataInicio.value, dataTermino.value, alocacaoCount);
            
            try {
                const inicioDate = new Date(dataInicio.value + 'T00:00:00');
                const terminoDate = dataTermino.value ? new Date(dataTermino.value + 'T00:00:00') : null;
                
                detailsDiv.innerHTML = `
                    <div class="alocacao-summary">
                        <div class="detail-item">
                            <i class="fas fa-user"></i>
                            <span><strong>${funcionarioText}</strong></span>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-building"></i>
                            <span>${obraServicoText}</span>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-user-tag"></i>
                            <span>Função: ${funcaoText}</span>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-calendar-check"></i>
                            <span>Início: ${formatDateBR(inicioDate)}</span>
                        </div>
                        ${terminoDate ? `
                            <div class="detail-item">
                                <i class="fas fa-calendar-times"></i>
                                <span>Término: ${formatDateBR(terminoDate)}</span>
                            </div>
                        ` : ''}
                        ${duracaoInfo}
                        <div class="detail-item">
                            <i class="fas fa-info-circle"></i>
                            <span>Status: <span class="status-badge ${statusClass}">${statusText}</span></span>
                        </div>
                        ${conflictInfo}
                    </div>
                `;
            } catch (error) {
                console.warn('Erro ao formatar datas:', error);
                detailsDiv.innerHTML = '<p>Erro ao processar informações das datas</p>';
            }
        } else {
            detailsDiv.innerHTML = '<p>Preencha os dados básicos para ver as informações</p>';
        }
    }
    
    [funcionario, obraServico, dataInicio, dataTermino, funcao, status].forEach(element => {
        if (element) {
            element.addEventListener('change', function() {
                updateAlocacaoDetails();
                updateResumoAlocacoesFuncionarios();
                if (typeof triggerAutoSave === 'function') {
                    triggerAutoSave();
                }
            });
        }
    });
    
    if (dataInicio) {
        dataInicio.addEventListener('change', function() {
            if (dataTermino && dataTermino.value && this.value > dataTermino.value) {
                dataTermino.value = '';
                if (typeof showToast === 'function') {
                    showToast('warning', 'Data Inválida', 'Data de término deve ser posterior ao início!');
                }
            }
            if (dataTermino) {
                dataTermino.min = this.value;
            }
            updateAlocacaoDetails();
        });
    }
    
    if (dataTermino) {
        dataTermino.addEventListener('change', function() {
            if (dataInicio && dataInicio.value && this.value < dataInicio.value) {
                this.value = '';
                if (typeof showToast === 'function') {
                    showToast('warning', 'Data Inválida', 'Data de término deve ser posterior ao início!');
                }
            }
            updateAlocacaoDetails();
        });
    }
    
    if (observacoes) {
        observacoes.addEventListener('input', function() {
            if (typeof triggerAutoSave === 'function') {
                triggerAutoSave();
            }
        });
    }
}


function checkAlocacaoConflicts(funcionarioId, dataInicio, dataTermino, currentAlocacao) {
    if (!funcionarioId || !dataInicio) return '';
    
    const alocacaoCards = document.querySelectorAll('.alocacao-funcionario-card');
    const conflicts = [];
    
    alocacaoCards.forEach((card, index) => {
        const cardNumber = index + 1;
        if (cardNumber === currentAlocacao) return; 
        
        const cardFuncionarioSelect = card.querySelector('select[name*="[funcionario]"]');
        const cardDataInicioInput = card.querySelector('input[name*="[dataInicio]"]');
        const cardDataTerminoInput = card.querySelector('input[name*="[dataTermino]"]');
        
        if (!cardFuncionarioSelect || !cardDataInicioInput) return;
        
        const cardFuncionario = cardFuncionarioSelect.value;
        const cardDataInicio = cardDataInicioInput.value;
        const cardDataTermino = cardDataTerminoInput ? cardDataTerminoInput.value : '';
        
        if (cardFuncionario === funcionarioId && cardDataInicio) {
            try {
                const inicio1 = new Date(dataInicio + 'T00:00:00');
                const termino1 = dataTermino ? new Date(dataTermino + 'T00:00:00') : new Date('2099-12-31');
                const inicio2 = new Date(cardDataInicio + 'T00:00:00');
                const termino2 = cardDataTermino ? new Date(cardDataTermino + 'T00:00:00') : new Date('2099-12-31');
                
                if (inicio1 <= termino2 && inicio2 <= termino1) {
                    const obraCard = card.querySelector('select[name*="[obraServico]"]');
                    const obraText = obraCard && obraCard.value ? obraCard.options[obraCard.selectedIndex].text : 'Obra não especificada';
                    conflicts.push(`Alocação ${cardNumber}: ${obraText}`);
                }
            } catch (error) {
                console.warn('Erro ao verificar conflitos de data:', error);
            }
        }
    });
    
    if (conflicts.length > 0) {
        return `
            <div class="conflict-warning">
                <i class="fas fa-exclamation-triangle"></i>
                <span><strong>Conflito de Alocação:</strong></span>
                <ul>
                    ${conflicts.map(conflict => `<li>${conflict}</li>`).join('')}
                </ul>
            </div>
        `;
    }
    
    return '';
}


function updateResumoAlocacoesFuncionarios() {
    const alocacaoCards = document.querySelectorAll('.alocacao-funcionario-card');
    const resumoDiv = document.getElementById('resumoAlocacoesFuncionarios');
    
    if (!resumoDiv) return;
    
    if (alocacaoCards.length === 0) {
        resumoDiv.innerHTML = '<p class="no-alocacoes">Nenhuma alocação de funcionário cadastrada</p>';
        return;
    }
    
    const funcionarios = new Set();
    const obras = new Set();
    const statusCount = {};
    const alocacoesAtivas = [];
    
    alocacaoCards.forEach((card, index) => {
        const funcionarioSelect = card.querySelector('select[name*="[funcionario]"]');
        const obraSelect = card.querySelector('select[name*="[obraServico]"]');
        const statusSelect = card.querySelector('select[name*="[status]"]');
        const dataInicioInput = card.querySelector('input[name*="[dataInicio]"]');
        const dataTerminoInput = card.querySelector('input[name*="[dataTermino]"]');
        
        if (!funcionarioSelect || !obraSelect || !statusSelect || !dataInicioInput) return;
        
        const funcionario = funcionarioSelect.value;
        const obra = obraSelect.value;
        const status = statusSelect.value;
        const dataInicio = dataInicioInput.value;
        const dataTermino = dataTerminoInput ? dataTerminoInput.value : '';
        
        if (funcionario) funcionarios.add(funcionario);
        if (obra) obras.add(obra);
        
        statusCount[status] = (statusCount[status] || 0) + 1;
        
        if (funcionario && obra && dataInicio) {
            try {
                const funcionarioText = funcionarioSelect.options[funcionarioSelect.selectedIndex].text;
                const obraText = obraSelect.options[obraSelect.selectedIndex].text;
                const statusClass = getStatusClass(status);
                const statusText = getStatusText(status);
                
                const inicioDate = new Date(dataInicio + 'T00:00:00');
                const terminoDate = dataTermino ? new Date(dataTermino + 'T00:00:00') : null;
                
                alocacoesAtivas.push({
                    numero: index + 1,
                    funcionario: funcionarioText,
                    obra: obraText,
                    dataInicio: formatDateBR(inicioDate),
                    dataTermino: terminoDate ? formatDateBR(terminoDate) : 'Em andamento',
                    status: status,
                    statusClass: statusClass,
                    statusText: statusText
                });
            } catch (error) {
                console.warn('Erro ao processar alocação:', error);
            }
        }
    });
    
    let resumoHTML = `
        <div class="resumo-stats-grid">
            <div class="stat-card">
                <div class="stat-number">${alocacaoCards.length}</div>
                <div class="stat-label">Total de Alocações</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${funcionarios.size}</div>
                <div class="stat-label">Funcionários Envolvidos</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${obras.size}</div>
                <div class="stat-label">Obras/Serviços</div>
            </div>
        </div>
    `;
    
    if (Object.keys(statusCount).length > 0) {
        resumoHTML += `
            <div class="status-distribution">
                <h5><i class="fas fa-chart-pie"></i> Distribuição por Status</h5>
                <div class="status-grid">
                    ${Object.keys(statusCount).map(status => `
                        <div class="status-item">
                            <span class="status-badge ${getStatusClass(status)}">${getStatusText(status)}</span>
                            <span class="status-count">${statusCount[status]}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    if (alocacoesAtivas.length > 0) {
        resumoHTML += `
            <div class="alocacoes-ativas-list">
                <h5><i class="fas fa-list"></i> Lista de Alocações</h5>
                <div class="alocacoes-table">
                    ${alocacoesAtivas.map(alocacao => `
                        <div class="alocacao-row">
                            <div class="alocacao-funcionario">${alocacao.funcionario}</div>
                            <div class="alocacao-obra">${alocacao.obra}</div>
                            <div class="alocacao-periodo">${alocacao.dataInicio} - ${alocacao.dataTermino}</div>
                            <div class="alocacao-status">
                                <span class="status-badge ${alocacao.statusClass}">${alocacao.statusText}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    resumoDiv.innerHTML = resumoHTML;
}


function formatDateBR(date) {
    if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
        return 'Data inválida';
    }
    
    try {
        return date.toLocaleDateString('pt-BR');
    } catch (error) {
        console.warn('Erro ao formatar data:', error);
        return 'Data inválida';
    }
}


function getStatusClass(status) {
    const statusMap = {
        'ativa': 'success',
        'planejada': 'info',
        'suspensa': 'warning',
        'finalizada': 'secondary',
        'transferida': 'primary'
    };
    return statusMap[status] || 'info';
}


function getStatusText(status) {
    const statusMap = {
        'ativa': 'Ativa',
        'planejada': 'Planejada',
        'suspensa': 'Suspensa',
        'finalizada': 'Finalizada',
        'transferida': 'Transferida'
    };
    return statusMap[status] || 'Ativa';
}


function saveAlocacaoFuncionariosDraft() {
    const formData = collectAlocacaoFuncionariosData();
    
    localStorage.setItem('alocacaoFuncionariosDraft', JSON.stringify(formData));
    
    if (typeof showToast === 'function') {
        showToast('success', 'Rascunho', 'Alocações de funcionários salvas como rascunho!');
    }
    
    if (typeof updateSaveStatus === 'function') {
        updateSaveStatus('Rascunho salvo');
    }
}


function submitAlocacaoFuncionariosData() {
    if (!validateAlocacaoFuncionariosForm()) {
        return;
    }
    
    const formData = collectAlocacaoFuncionariosData();
    
    if (typeof showToast === 'function') {
        showToast('info', 'Envio', 'Enviando alocações de funcionários...');
    }
    
    setTimeout(() => {
        localStorage.removeItem('alocacaoFuncionariosDraft');
        
        if (typeof showToast === 'function') {
            showToast('success', 'Sucesso', 'Alocações de funcionários enviadas com sucesso!');
        }
        
        setTimeout(() => {
            closeAlocacaoFuncionariosModal();
        }, 1500);
    }, 2000);
}


function collectAlocacaoFuncionariosData() {
    const alocacaoCards = document.querySelectorAll('.alocacao-funcionario-card');
    const alocacoes = [];
    
    alocacaoCards.forEach((card, index) => {
        const funcionarioSelect = card.querySelector('select[name*="[funcionario]"]');
        const obraSelect = card.querySelector('select[name*="[obraServico]"]');
        const dataInicioInput = card.querySelector('input[name*="[dataInicio]"]');
        const dataTerminoInput = card.querySelector('input[name*="[dataTermino]"]');
        const funcaoSelect = card.querySelector('select[name*="[funcao]"]');
        const statusSelect = card.querySelector('select[name*="[status]"]');
        const observacoesTextarea = card.querySelector('textarea[name*="[observacoes]"]');
        
        const alocacao = {
            numero: index + 1,
            funcionario: funcionarioSelect ? funcionarioSelect.value : '',
            obraServico: obraSelect ? obraSelect.value : '',
            dataInicio: dataInicioInput ? dataInicioInput.value : '',
            dataTermino: dataTerminoInput ? dataTerminoInput.value : '',
            funcao: funcaoSelect ? funcaoSelect.value : '',
            status: statusSelect ? statusSelect.value : '',
            observacoes: observacoesTextarea ? observacoesTextarea.value : ''
        };
        
        alocacoes.push(alocacao);
    });
    
    return {
        alocacoesFuncionarios: alocacoes,
        timestamp: new Date().toISOString()
    };
}


function validateAlocacaoFuncionariosForm() {
    const alocacaoCards = document.querySelectorAll('.alocacao-funcionario-card');
    
    if (alocacaoCards.length === 0) {
        if (typeof showToast === 'function') {
            showToast('warning', 'Validação', 'Adicione pelo menos uma alocação de funcionário!');
        }
        return false;
    }
    
    let isValid = true;
    let hasValidAlocacao = false;
    
    alocacaoCards.forEach((card, index) => {
        const funcionario = card.querySelector('select[name*="[funcionario]"]');
        const obraServico = card.querySelector('select[name*="[obraServico]"]');
        const dataInicio = card.querySelector('input[name*="[dataInicio]"]');
        const dataTermino = card.querySelector('input[name*="[dataTermino]"]');
        
        [funcionario, obraServico, dataInicio].forEach(field => {
            if (field) {
                field.style.borderColor = '';
            }
        });
        
        if (!funcionario || !funcionario.value) {
            if (funcionario) funcionario.style.borderColor = '#e74c3c';
            isValid = false;
        }
        
        if (!obraServico || !obraServico.value) {
            if (obraServico) obraServico.style.borderColor = '#e74c3c';
            isValid = false;
        }
        
        if (!dataInicio || !dataInicio.value) {
            if (dataInicio) dataInicio.style.borderColor = '#e74c3c';
            isValid = false;
        }
        
        if (dataInicio && dataTermino && dataInicio.value && dataTermino.value && dataInicio.value > dataTermino.value) {
            dataTermino.style.borderColor = '#e74c3c';
            if (typeof showToast === 'function') {
                showToast('error', 'Validação', `Data de término da Alocação ${index + 1} deve ser posterior ao início!`);
            }
            isValid = false;
        }
        
        if (funcionario && obraServico && dataInicio && funcionario.value && obraServico.value && dataInicio.value) {
            hasValidAlocacao = true;
        }
    });
    
    if (!hasValidAlocacao) {
        if (typeof showToast === 'function') {
            showToast('warning', 'Validação', 'Preencha pelo menos uma alocação completa!');
        }
        isValid = false;
    }
    
    if (!isValid && typeof showToast === 'function') {
        showToast('error', 'Validação', 'Preencha todos os campos obrigatórios corretamente!');
    }
    
    return isValid;
}


function loadAlocacaoFuncionariosData() {
    const savedData = localStorage.getItem('alocacaoFuncionariosDraft');
    
    if (savedData) {
        try {
            const data = JSON.parse(savedData);
            
            if (data.alocacoesFuncionarios && data.alocacoesFuncionarios.length > 0) {
                const container = document.getElementById('alocacoesFuncionariosContainer');
                if (container) {
                    container.innerHTML = '';
                    
                    data.alocacoesFuncionarios.forEach((alocacao, index) => {
                        addAlocacaoFuncionario();
                        
                        setTimeout(() => {
                            const card = container.children[index];
                            if (card) {
                                const funcionarioSelect = card.querySelector('select[name*="[funcionario]"]');
                                const obraSelect = card.querySelector('select[name*="[obraServico]"]');
                                const dataInicioInput = card.querySelector('input[name*="[dataInicio]"]');
                                const dataTerminoInput = card.querySelector('input[name*="[dataTermino]"]');
                                const funcaoSelect = card.querySelector('select[name*="[funcao]"]');
                                const statusSelect = card.querySelector('select[name*="[status]"]');
                                const observacoesTextarea = card.querySelector('textarea[name*="[observacoes]"]');
                                
                                if (funcionarioSelect) funcionarioSelect.value = alocacao.funcionario || '';
                                if (obraSelect) obraSelect.value = alocacao.obraServico || '';
                                if (dataInicioInput) dataInicioInput.value = alocacao.dataInicio || '';
                                if (dataTerminoInput) dataTerminoInput.value = alocacao.dataTermino || '';
                                if (funcaoSelect) funcaoSelect.value = alocacao.funcao || '';
                                if (statusSelect) statusSelect.value = alocacao.status || 'ativa';
                                if (observacoesTextarea) observacoesTextarea.value = alocacao.observacoes || '';
                                
                                if (funcionarioSelect) {
                                    funcionarioSelect.dispatchEvent(new Event('change'));
                                }
                            }
                        }, 100 * index);
                    });
                    
                    if (typeof showToast === 'function') {
                        showToast('info', 'Dados Carregados', 'Rascunho das alocações de funcionários carregado!');
                    }
                }
            }
        } catch (error) {
            console.warn('Erro ao carregar dados das alocações de funcionários:', error);
        }
    }
}


function updateSaveStatus(message) {
    const saveStatus = document.getElementById('saveStatus');
    if (saveStatus) {
        const span = saveStatus.querySelector('span');
        if (span) {
            span.textContent = message;
        }
        
        saveStatus.style.animation = 'pulse 0.5s ease-in-out';
        setTimeout(() => {
            if (saveStatus) {
                saveStatus.style.animation = '';
            }
        }, 500);
    }
}


// ===== FUNÇÕES AUXILIARES =====

function initializeEmployeeForm() {
    const cpfInput = document.getElementById('cpf');
    if (cpfInput) {
        cpfInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
            e.target.value = value;
        });
    }

    const pisInput = document.getElementById('pis-pasep');
    if (pisInput) {
        pisInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{5})(\d)/, '$1.$2');
            value = value.replace(/(\d{2})(\d{1})$/, '$1-$2');
            e.target.value = value;
        });
    }

    const form = document.getElementById('employeeDataForm');
    if (form) {
        const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
        
        inputs.forEach(input => {
            input.addEventListener('input', validateField);
            input.addEventListener('blur', validateField);
        });
    }
}

function validateField(e) {
    const field = e.target;
    if (!field) return;
    
    const value = field.value ? field.value.trim() : '';
    
    field.classList.remove('valid', 'invalid');
    
    if (field.hasAttribute('required')) {
        if (value === '') {
            field.classList.add('invalid');
        } else {
            field.classList.add('valid');
        }
    }
}

// Sistema de auto-save
let autoSaveInterval;

function startAutoSave() {
    if (autoSaveInterval) {
        clearInterval(autoSaveInterval);
    }
    
    autoSaveInterval = setInterval(() => {
        autoSaveData();
    }, 10000);
}

function autoSaveData() {
    const saveStatus = document.getElementById('saveStatus');
    if (saveStatus) {
        saveStatus.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Salvando...</span>';
        
        setTimeout(() => {
            saveStatus.innerHTML = '<i class="fas fa-check-circle"></i><span>Salvo</span>';
        }, 1000);
    }
}

function triggerAutoSave() {
    autoSaveData();
}

function updateSaveStatus(message) {
    const saveStatus = document.getElementById('saveStatus');
    if (saveStatus) {
        const span = saveStatus.querySelector('span');
        if (span) {
            span.textContent = message;
        } else {
            saveStatus.innerHTML = `<i class="fas fa-check-circle"></i><span>${message}</span>`;
        }
    }
}

// ===== SISTEMA DE TOASTS =====

function showToast(type, title, message) {
    if (!type || !title || !message) {
        console.warn('Parâmetros inválidos para showToast:', { type, title, message });
        return;
    }
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let icon;
    switch(type) {
        case 'success':
            icon = 'fas fa-check-circle';
            break;
        case 'error':
            icon = 'fas fa-exclamation-circle';
            break;
        case 'warning':
            icon = 'fas fa-exclamation-triangle';
            break;
        case 'info':
            icon = 'fas fa-info-circle';
            break;
        default:
            icon = 'fas fa-bell';
    }
    
    toast.innerHTML = `
        <div class="toast-content">
            <i class="${icon}"></i>
            <div class="toast-text">
                <strong>${title}</strong>
                <p>${message}</p>
            </div>
            <button class="toast-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        border-left: 4px solid ${getToastColor(type)};
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        min-width: 300px;
        max-width: 400px;
    `;
    
    if (document.body) {
        document.body.appendChild(toast);
        
        setTimeout(() => {
            if (toast.parentElement) {
                toast.remove();
            }
        }, 5000);
    }
}

function getToastColor(type) {
    switch(type) {
        case 'success': return '#27AE60';
        case 'error': return '#E74C3C';
        case 'warning': return '#F39C12';
        case 'info': return '#3498DB';
        default: return '#95A5A6';
    }
}

// ===== FUNÇÕES DE SALVAMENTO E ENVIO =====

function saveDraft() {
    if (typeof showToast === 'function') {
        showToast('success', 'Rascunho', 'Rascunho salvo com sucesso!');
    }
}

function submitEmployeeData() {
    const form = document.getElementById('employeeDataForm');
    if (!form) {
        if (typeof showToast === 'function') {
            showToast('error', 'Erro', 'Formulário não encontrado!');
        }
        return;
    }
    
    const requiredFields = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        const value = field.value ? field.value.trim() : '';
        if (!value) {
            field.classList.add('invalid');
            isValid = false;
        } else {
            field.classList.remove('invalid');
            field.classList.add('valid');
        }
    });
    
    if (isValid) {
        if (typeof showToast === 'function') {
            showToast('success', 'Sucesso', 'Dados pessoais enviados com sucesso!');
        }
        setTimeout(() => {
            if (typeof closeModal === 'function') {
                closeModal();
            }
        }, 1500);
    } else {
        if (typeof showToast === 'function') {
            showToast('error', 'Erro', 'Por favor, preencha todos os campos obrigatórios!');
        }
    }
}

function downloadXML(id) {
    if (typeof showToast === 'function') {
        showToast('success', 'Download', `Download do XML ${id} iniciado!`);
    }
}

function viewXML(id) {
    if (typeof showToast === 'function') {
        showToast('info', 'Visualização', `Visualizando XML ${id}...`);
    }
}

function exportXMLs() {
    if (typeof showToast === 'function') {
        showToast('success', 'Exportação', 'Exportação de XMLs iniciada!');
    }
}

// ===== FUNÇÕES DE FECHAMENTO =====

function closeModal() {
    if (autoSaveInterval) {
        clearInterval(autoSaveInterval);
        autoSaveInterval = null;
    }
    
    const modalContainer = document.getElementById('modalContainer');
    if (modalContainer) {
        modalContainer.innerHTML = '';
    }
}

function closeFiscalModal() {
    if (autoSaveInterval) {
        clearInterval(autoSaveInterval);
        autoSaveInterval = null;
    }
    
    const modalContainerFiscal = document.getElementById('modalContainerFiscal');
    if (modalContainerFiscal) {
        modalContainerFiscal.innerHTML = '';
    }
}

function closeSolicitacoesModal() {
    if (autoSaveInterval) {
        clearInterval(autoSaveInterval);
        autoSaveInterval = null;
    }
    
    const modalContainerSolicitacoes = document.getElementById('modalContainerSolicitacoes');
    if (modalContainerSolicitacoes) {
        modalContainerSolicitacoes.innerHTML = '';
    }
}

// ===== FUNÇÕES DE MENSAGENS =====

function showFeatureMessage(featureName, feature) {
    if (!featureName) {
        console.warn('Nome da funcionalidade não fornecido');
        return;
    }
    
    const message = document.createElement('div');
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 2rem;
        border-radius: 16px;
        box-shadow: 0 20px 60px rgba(27, 54, 93, 0.3);
        z-index: 10000;
        text-align: center;
        max-width: 400px;
        animation: scaleIn 0.3s ease-out;
    `;
    
    message.innerHTML = `
        <div style="margin-bottom: 1.5rem;">
            <i class="fas fa-tools" style="font-size: 3rem; color: #1B365D; margin-bottom: 1rem;"></i>
            <h3 style="color: #2C3E50; margin-bottom: 0.5rem;">${featureName}</h3>
            <p style="color: #7F8C8D;">Esta funcionalidade está em desenvolvimento e estará disponível em breve.</p>
        </div>
        <button onclick="this.parentElement.remove()" style="
            background: linear-gradient(135deg, #1B365D 0%, #2E5984 100%);
            color: white;
            border: none;
            padding: 0.75rem 2rem;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 500;
            transition: all 0.3s ease;
        " onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
            Entendi
        </button>
    `;
    
    if (document.body) {
        document.body.appendChild(message);
        
        setTimeout(() => {
            if (message.parentElement) {
                message.remove();
            }
        }, 10000);
    }
}

function showCompanyChangeMessage(companyName) {
    if (companyName && typeof showToast === 'function') {
        showToast('info', 'Empresa Alterada', `Empresa alterada para: ${companyName}`);
    }
}

function showSuccessMessage(message) {
    if (message && typeof showToast === 'function') {
        showToast('success', 'Sucesso', message);
    }
}

function showErrorMessage(message) {
    if (message && typeof showToast === 'function') {
        showToast('error', 'Erro', message);
    }
}

// ===== FUNÇÃO DE LOGOUT =====

function logout() {
    if (confirm('Tem certeza que deseja sair?')) {
        try {
            localStorage.removeItem('userData');
            localStorage.removeItem('dashboardContext');
            
            if (autoSaveInterval) {
                clearInterval(autoSaveInterval);
                autoSaveInterval = null;
            }
            
            const exitOverlay = document.createElement('div');
            exitOverlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, #1B365D 0%, #2E5984 100%);
                z-index: 9999;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                color: white;
                animation: fadeIn 0.5s ease-out;
            `;
            
            exitOverlay.innerHTML = `
                <div style="text-align: center;">
                    <div style="
                        width: 60px;
                        height: 60px;
                        border: 4px solid rgba(212, 175, 55, 0.3);
                        border-top: 4px solid #D4AF37;
                        border-radius: 50%;
                        animation: spin 1s linear infinite;
                        margin: 0 auto 1.5rem auto;
                    "></div>
                    <h2 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 0.5rem;">
                        Encerrando Sessão
                    </h2>
                    <p style="opacity: 0.8;">Até logo!</p>
                </div>
            `;
            
            if (document.body) {
                document.body.appendChild(exitOverlay);
            }
            
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        } catch (error) {
            console.error('Erro durante logout:', error);
            window.location.href = 'index.html';
        }
    }
}

// ===== ADICIONAR ANIMAÇÕES CSS =====

function addAnimationStyles() {
    if (document.getElementById('dashboard-animations')) {
        return;
    }
    
    const animations = `
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
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        
        @keyframes scaleIn {
            from {
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.8);
            }
            to {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1);
            }
        }
        
        @keyframes fadeInScale {
            from {
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.9);
            }
            to {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1);
            }
        }
        
        @keyframes fadeInDown {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .toast-content {
            display: flex;
            align-items: flex-start;
            gap: 1rem;
            padding: 1rem;
        }
        
        .toast-content i {
            font-size: 1.2rem;
            margin-top: 0.2rem;
        }
        
        .toast-text {
            flex: 1;
        }
        
        .toast-text strong {
            display: block;
            margin-bottom: 0.25rem;
            color: #2C3E50;
        }
        
        .toast-text p {
            margin: 0;
            color: #7F8C8D;
            font-size: 0.9rem;
        }
        
        .toast-close {
            background: none;
            border: none;
            color: #7F8C8D;
            cursor: pointer;
            padding: 0.25rem;
            border-radius: 4px;
            transition: all 0.2s ease;
        }
        
        .toast-close:hover {
            background: rgba(127, 140, 141, 0.1);
            color: #2C3E50;
        }
        
        .ferias-info {
            margin-top: 1rem;
        }
        
        .info-card {
            background: #f8f9fa;
            border: 1px solid #e9ecef;
            border-radius: 8px;
            padding: 1.5rem;
        }
        
        .info-card h4 {
            margin: 0 0 1rem 0;
            color: #1B365D;
            font-size: 1.1rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .ferias-summary {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }
        
        .summary-item {
            display: flex;
            justify-content: space-between;
            padding: 0.5rem 0;
            border-bottom: 1px solid #e9ecef;
        }
        
        .summary-item:last-child {
            border-bottom: none;
        }
        
        .checkbox-group {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            margin-top: 0.5rem;
        }
        
        .checkbox-container {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            cursor: pointer;
            padding: 0.75rem;
            border-radius: 8px;
            transition: all 0.3s ease;
        }
        
        .checkbox-container:hover {
            background: rgba(27, 54, 93, 0.05);
        }
        
        .checkbox-container input[type="checkbox"] {
            display: none;
        }
        
        .checkbox-container .checkmark {
            width: 18px;
            height: 18px;
            border: 2px solid #ECF0F1;
            border-radius: 4px;
            position: relative;
            transition: all 0.3s ease;
            flex-shrink: 0;
        }
        
        .checkbox-container input[type="checkbox"]:checked + .checkmark {
            background: #1B365D;
            border-color: #1B365D;
        }
        
        .checkbox-container input[type="checkbox"]:checked + .checkmark::after {
            content: '✓';
            position: absolute;
            color: white;
            font-size: 12px;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-weight: bold;
        }
        
        .valid {
            border-color: #27AE60 !important;
            background-color: rgba(39, 174, 96, 0.1);
        }
        
        .invalid {
            border-color: #E74C3C !important;
            background-color: rgba(231, 76, 60, 0.1);
        }
    `;

    const style = document.createElement('style');
    style.id = 'dashboard-animations';
    style.textContent = animations;
    
    if (document.head) {
        document.head.appendChild(style);
    }
}

// ===== INICIALIZAÇÃO =====

document.addEventListener('DOMContentLoaded', function() {
    try {
        addAnimationStyles();
        
        const userData = localStorage.getItem('userData');
        
        if (userData) {
            const user = JSON.parse(userData);
            console.log('Usuário logado:', user.email);
            console.log('Login realizado em:', user.loginTime);
        } else {
            console.warn('Dados do usuário não encontrados, redirecionando para login');
            window.location.href = 'index.html';
            return;
        }
        
        const savedContext = localStorage.getItem('dashboardContext');
        if (savedContext) {
            try {
                const context = JSON.parse(savedContext);
                console.log('Contexto restaurado:', context);
                
                if (context.company) {
                    const companyOptions = document.querySelectorAll('.company-option');
                    companyOptions.forEach(option => {
                        const spanElement = option.querySelector('span');
                        if (spanElement && spanElement.textContent === context.company) {
                            option.click();
                        }
                    });
                }
                
                if (context.section && context.section !== 'dashboard') {
                    const navItem = document.querySelector(`[data-section="${context.section}"]`);
                    if (navItem) {
                        navItem.click();
                    }
                }
            } catch (error) {
                console.error('Erro ao restaurar contexto:', error);
                localStorage.removeItem('dashboardContext');
            }
        }
    } catch (error) {
        console.error('Erro na inicialização:', error);
        window.location.href = 'index.html';
    }
});

// ===== LIMPEZA AO SAIR DA PÁGINA =====

window.addEventListener('beforeunload', function() {
    if (autoSaveInterval) {
        clearInterval(autoSaveInterval);
        autoSaveInterval = null;
    }
});

// ===== TRATAMENTO DE ERROS GLOBAIS =====

window.addEventListener('error', function(event) {
    console.error('Erro JavaScript:', event.error);
});

window.addEventListener('unhandledrejection', function(event) {
    console.error('Promise rejeitada:', event.reason);
});