# QA Automation - Cypress E2E

Projeto de automação de testes E2E utilizando Cypress, aplicado sobre o site público
https://automationexercise.com, com foco na validação de fluxos críticos da aplicação.

## Objetivo

Validar os principais fluxos funcionais do sistema, garantindo que funcionalidades
essenciais estejam operando corretamente em diferentes cenários.

## Aplicação testada

Automation Exercise – site público de demonstração para prática de automação de testes.

### Pré-requisitos

- Node.js (v14 ou superior)
- npm

### Instalação

```bash
npm install
```

Isso instalará:
- Cypress
- cypress-xpath (para suporte a XPath)

### Configuração do Ambiente

O projeto está configurado para usar `https://automationexercise.com` como URL base. Isso é definido em `cypress.config.js` e se aplica a todos os testes.

---

## 📁 Estrutura do Projeto

```
qa-cypress-e2e/
├── cypress/
│   ├── e2e/                 # Especificações de testes
│   │   ├── cart.cy.js       # Testes de funcionalidade do carrinho
│   │   ├── login.cy.js      # Testes de login
│   │   ├── products.cy.js   # Testes de busca e filtro de produtos
│   │   └── signup.cy.js     # Testes de criação de conta
│   ├── fixtures/
│   │   └── user.json        # Dados do usuário de teste (reutilizáveis)
│   └── support/
│       ├── commands.js      # Comandos Cypress personalizados
│       ├── e2e.js          # Arquivo de suporte E2E do Cypress
│       └── locators.js      # Seletores de elementos centralizados
├── cypress.config.js        # Configuração do Cypress
├── package.json            # Dependências do projeto
└── README.md              # Este arquivo
```

---

## 🧪 Cenários de Testes

### 1. **Testes de Login** (`login.cy.js`)
- ✅ Exibir formulário de login
- ✅ Mostrar erro com credenciais inválidas
- ✅ Validar campo de email obrigatório
- ✅ Validar campo de senha obrigatório
- ✅ Validar formato de email
- ✅ Login bem-sucedido com credenciais válidas
- ✅ Exibir nome de usuário logado
- ✅ Logout e retornar ao estado não autenticado

### 2. **Testes de Cadastro** (`signup.cy.js`)
- ✅ Exibir formulário de cadastro
- ✅ Inserir email e senha
- ✅ Marcar botão de título
- ✅ Selecionar data de nascimento
- ✅ Marcar newsletter e ofertas especiais
- ✅ Preencher todos os campos e criar conta

### 3. **Testes de Produtos** (`products.cy.js`)
- ✅ Exibir lista de produtos
- ✅ Buscar um produto
- ✅ Filtrar produtos por categoria
- ✅ Visualizar detalhes do produto

### 4. **Testes de Carrinho** (`cart.cy.js`)
- ✅ Efetuar login e adicionar produto ao carrinho
- ✅ Remover produto do carrinho
- ✅ Prosseguir para o checkout

---

## ⚙️ Configuração

### `cypress.config.js`

```javascript
module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://automationexercise.com',
  },
});
```

**Configurações Principais:**
- `baseUrl`: Todas as chamadas `cy.visit()` usam caminhos relativos (ex: `/login` → `https://automationexercise.com/login`)

---

## 🎯 Comandos Personalizados

Comandos personalizados são definidos em `cypress/support/commands.js` e fornecem fluxos de trabalho reutilizáveis:

### Autenticação
```javascript
cy.login(email, password)              // Preenche email, password e clica em login
cy.logout()                            // Efetua logout (idempotente)
```

### Ações do Carrinho
```javascript
cy.addToCart(productId = 1)            // Adiciona produto ao carrinho (visita página de produtos)
cy.openCart()                          // Clica no link Ver Carrinho
cy.removeFirstItemFromCart()           // Remove primeiro item do carrinho
```

### Produtos
```javascript
cy.searchProducts(searchTerm)          // Digita termo de busca e envia
cy.filterByCategory(category, itemIndex = 1)  // Filtra por categoria e seleciona item
```

---

## 🎨 Locators

Os locators são centralizados em `cypress/support/locators.js` para melhor manutenção. Atualizar seletores em um único lugar beneficia todos os testes.

### Exemplo de Uso em Testes

```javascript
import locators from '../support/locators';

cy.get(locators.LOGIN.EMAIL).type('user@example.com');
cy.get(locators.CART.CHECKOUT_BTN).click();
```

### Categorias de Localizadores

- **LOGIN** — Email, senha e botão de login
- **MESSAGE** — Mensagens de erro e sucesso
- **USER** — Perfil do usuário e elementos de logout
- **SIGNUP** — Formulário de cadastro inicial
- **SIGNUP_FORM** — Campos completos do formulário de cadastro
- **PRODUCTS** — Busca, filtro e detalhes de produtos
- **CART** — Modal do carrinho e botões

---

## 📦 Fixtures

Dados de teste são armazenados em `cypress/fixtures/user.json`:

```json
{
  "name": "Usuario de Teste Funcional 2",
  "email": "usertestfunc2@example.com",
  "password": "@@@senha434!"
}
```

**Uso em Testes:**

```javascript
describe('Cenário', () => {
  before(function() {
    cy.fixture('user').then((user) => {
      this.user = user;
    });
  });

  it('teste', function() {
    cy.login(this.user.email, this.user.password);
  });
});
```

---

## 🏃 Executando Testes

### Abrir Interface do Cypress
```bash
npm run cypress:open
```
Depois selecione:
- **E2E Testing** → Escolha um navegador (Chromium, Firefox, etc.) → Selecione um arquivo de teste

### Executar Todos os Testes (Headless)
```bash
npx cypress run
```

### Executar Teste Específico
```bash
npx cypress run --spec "cypress/e2e/login.cy.js"
```

### Executar com Opção de Navegador
```bash
npx cypress run --browser chrome
npx cypress run --browser firefox
```

---

## ✅ Boas Práticas Implementadas

### 1. **Locators Centralizados**
   - Uma única fonte de verdade para seletores
   - Atualizações fáceis quando a UI muda
   - Melhor legibilidade

### 2. **Comandos Reutilizáveis**
   - Princípio DRY (Don't Repeat Yourself)
   - Fluxos de trabalho comuns encapsulados
   - Mais fácil de manter

### 3. **Dados de Teste via Fixtures**
   - Sem credenciais hardcoded nos testes
   - Fácil troca de dados de teste
   - Consistente em todos os testes

### 4. **Configuração de URL Base**
   - Evita URLs hardcoded
   - Mais fácil testar ambientes diferentes
   - Caminhos relativos mais limpos

### 5. **Carregamento de Fixtures com Hooks**
   - Hook `before()`: Carrega fixture uma vez por cenário
   - Tratamento assíncrono previne race conditions
   - Uso eficiente de recursos

### 6. **Logout Idempotente**
   - `cy.logout()` não falha se já estiver desconectado
   - Seguro para chamar múltiplas vezes

---

## 🔄 Exemplo de Fluxo de Trabalho

Aqui está um fluxo de teste típico:

```javascript
describe('Fluxo de Login', () => {
  before(function() {
    // Carrega usuário de teste uma vez
    cy.fixture('user').then((user) => {
      this.user = user;
    });
  });

  beforeEach(() => {
    // Garante estado limpo antes de cada teste
    cy.visit('/');
    cy.logout();
    cy.visit('/login');
  });

  it('deve fazer login com sucesso', function() {
    // Usa comando reutilizável com dados de fixture
    cy.login(this.user.email, this.user.password);
    
    // Usa localizadores centralizados
    cy.contains(locators.MESSAGE.LOGGED_IN_AS_TEXT).should('be.visible');
  });
});
```

---

## 📝 Notas

- Os testes usam `cypress-xpath` para seletores XPath quando necessário
- Todos os testes são independentes e podem ser executados em qualquer ordem
- O usuário da fixture (`Usuario de Teste Funcional 5`) deve estar pré-registrado no site
- A URL base pode ser substituída em tempo de execução: `npx cypress run --config baseUrl=https://example.com`

---

## 📚 Recursos

- [Documentação do Cypress](https://docs.cypress.io/)
- [Boas Práticas de Teste](https://docs.cypress.io/guides/references/best-practices)
- [Comandos Personalizados](https://docs.cypress.io/api/cypress-api/custom-commands)

