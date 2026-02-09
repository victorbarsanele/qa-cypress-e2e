# QA Automation - Cypress E2E

[🇧🇷 Português](#português) | [🇺🇸 English](#english)

---

<h2 id="português">🇧🇷 Português</h2>

## 🚀 Stack de QA
- E2E com Cypress
- Seletores centralizados
- Tests independentes

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
- ✅ Inserir email e senha com email dinâmico (evita duplicidade de usuário)
- ✅ Marcar botão de título
- ✅ Selecionar data de nascimento
- ✅ Marcar newsletter e ofertas especiais
- ✅ Preencher todos os campos e criar conta

**Nota:** Os testes de cadastro usam `Date.now()` para gerar emails únicos, permitindo múltiplas execuções sem falhas por duplicação.

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

**Uso em Testes (Padrão com Aliases):**

Os testes usam Cypress aliases para evitar problemas com `this` context e tornar o código mais resiliente:

```javascript
describe('Cenário', () => {
  beforeEach(function() {
    // Registra a fixture como alias antes de cada teste
    cy.fixture('user').as('user');
  });

  it('teste', function() {
    // Acessa via alias para evitar problemas de contexto
    cy.get('@user').then(({ email, password }) => {
      cy.login(email, password);
    });
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

### 3. **Dados de Teste via Fixtures com Aliases**
   - Sem credenciais hardcoded nos testes
   - Fácil troca de dados de teste
   - Consistente em todos os testes
   - **Usa `cy.get('@user').then(...)` em vez de `this.user` para maior robustez**

### 4. **Configuração de URL Base**
   - Evita URLs hardcoded
   - Mais fácil testar ambientes diferentes
   - Caminhos relativos mais limpos

### 5. **Carregamento de Fixtures em `beforeEach`**
   - Registra alias **antes de cada teste** (não apenas uma vez)
   - Evita problemas de alias não disponível
   - Garante estado consistente entre execuções

### 6. **Logout Resiliente e Idempotente**
   - `cy.logout()` não falha se já estiver desconectado
   - Verifica existência do elemento antes de clicar
   - Seguro para chamar em hooks `beforeEach` repetidamente

### 7. **Emails Dinâmicos em Testes de Cadastro**
   - Usa `Date.now()` para gerar emails únicos
   - Permite múltiplas execuções sem "user already exists"
   - Combina dados de fixture (nome, password) com emails gerados

---

## 🔄 Exemplo de Fluxo de Trabalho

Aqui está um fluxo de teste típico usando aliases:

```javascript
describe('Fluxo de Login', () => {
  beforeEach(() => {
    // Registra fixture como alias antes de cada teste
    cy.fixture('user').as('user');
  });

  beforeEach(() => {
    // Garante estado limpo antes de cada teste
    cy.visit('/');
    cy.logout();
    cy.visit('/login');
  });

  it('deve fazer login com sucesso', function() {
    // Acessa dados via alias
    cy.get('@user').then(({ email, password }) => {
      cy.login(email, password);
      cy.contains(locators.MESSAGE.LOGGED_IN_AS_TEXT).should('be.visible');
    });
  });
});
```

### Exemplo com Email Dinâmico (Testes de Cadastro)

```javascript
it('deve criar conta com email único', function() {
  const email = `user${Date.now()}@example.com`;
  
  cy.get(locators.SIGNUP.EMAIL).type(email);
  cy.get(locators.SIGNUP.BTN_SIGNUP).click();
  
  cy.url().should('include', '/signup');
  cy.get(locators.SIGNUP_FORM.EMAIL).should('have.value', email);
});
```

---

## 📝 Notas

- Os testes usam `cypress-xpath` para seletores XPath quando necessário
- Todos os testes são independentes e podem ser executados em qualquer ordem
- O usuário da fixture (`Usuario de Teste Funcional 2`) deve estar pré-registrado no site para testes de login
- **Testes de cadastro geram emails dinâmicos com `Date.now()`, permitindo execução repetida**
- **Fixtures são carregadas via aliases (`cy.get('@user')`) em `beforeEach` para maior robustez**
- **O comando `cy.logout()` é idempotente e seguro em hooks de setup**
- A URL base pode ser substituída em tempo de execução: `npx cypress run --config baseUrl=https://example.com`

---

## 📚 Recursos

- [Documentação do Cypress](https://docs.cypress.io/)
- [Boas Práticas de Teste](https://docs.cypress.io/guides/references/best-practices)
- [Comandos Personalizados](https://docs.cypress.io/api/cypress-api/custom-commands)

---

<h2 id="english">🇺🇸 English</h2>

## 🚀 QA Stack
- E2E with Cypress
- Centralized selectors
- Independent tests

# QA Automation - Cypress E2E

E2E test automation project using Cypress, applied to the public website
https://automationexercise.com, with a focus on validating critical application flows.

## Objective

Validate the main functional flows of the system, ensuring that essential features
are operating correctly in different scenarios.

## Application Under Test

Automation Exercise – a public demonstration website for practicing test automation.

### Prerequisites

- Node.js (v14 or higher)
- npm

### Installation

```bash
npm install
```

This will install:
- Cypress
- cypress-xpath (for XPath support)

### Environment Configuration

The project is configured to use `https://automationexercise.com` as the base URL. This is defined in `cypress.config.js` and applies to all tests.

---

## 📁 Project Structure

```
qa-cypress-e2e/
├── cypress/
│   ├── e2e/                 # Test specifications
│   │   ├── cart.cy.js       # Cart functionality tests
│   │   ├── login.cy.js      # Login tests
│   │   ├── products.cy.js   # Product search and filter tests
│   │   └── signup.cy.js     # Account creation tests
│   ├── fixtures/
│   │   └── user.json        # Test user data (reusable)
│   └── support/
│       ├── commands.js      # Custom Cypress commands
│       ├── e2e.js          # Cypress E2E support file
│       └── locators.js      # Centralized element selectors
├── cypress.config.js        # Cypress configuration
├── package.json            # Project dependencies
└── README.md              # This file
```

---

## 🧪 Test Scenarios

### 1. **Login Tests** (`login.cy.js`)
- ✅ Display login form
- ✅ Show error with invalid credentials
- ✅ Validate required email field
- ✅ Validate required password field
- ✅ Validate email format
- ✅ Successful login with valid credentials
- ✅ Display logged-in username
- ✅ Logout and return to unauthenticated state

### 2. **Sign-Up Tests** (`signup.cy.js`)
- ✅ Display sign-up form
- ✅ Enter email and password with dynamic email (avoids user duplication)
- ✅ Check title radio button
- ✅ Select date of birth
- ✅ Check newsletter and special offers
- ✅ Fill all fields and create account

**Note:** Sign-up tests use `Date.now()` to generate unique emails, allowing multiple executions without duplication failures.

### 3. **Product Tests** (`products.cy.js`)
- ✅ Display product list
- ✅ Search for a product
- ✅ Filter products by category
- ✅ View product details

### 4. **Cart Tests** (`cart.cy.js`)
- ✅ Login and add product to cart
- ✅ Remove product from cart
- ✅ Proceed to checkout

---

## ⚙️ Configuration

### `cypress.config.js`

```javascript
module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://automationexercise.com',
  },
});
```

**Main Configurations:**
- `baseUrl`: All `cy.visit()` calls use relative paths (e.g., `/login` → `https://automationexercise.com/login`)

---

## 🎯 Custom Commands

Custom commands are defined in `cypress/support/commands.js` and provide reusable workflows:

### Authentication
```javascript
cy.login(email, password)              // Fills email, password and clicks login
cy.logout()                            // Logs out (idempotent)
```

### Cart Actions
```javascript
cy.addToCart(productId = 1)            // Adds product to cart (visits products page)
cy.openCart()                          // Clicks View Cart link
cy.removeFirstItemFromCart()           // Removes first item from cart
```

### Products
```javascript
cy.searchProducts(searchTerm)          // Types search term and submits
cy.filterByCategory(category, itemIndex = 1)  // Filters by category and selects item
```

---

## 🎨 Locators

Locators are centralized in `cypress/support/locators.js` for better maintenance. Updating selectors in one place benefits all tests.

### Example Usage in Tests

```javascript
import locators from '../support/locators';

cy.get(locators.LOGIN.EMAIL).type('user@example.com');
cy.get(locators.CART.CHECKOUT_BTN).click();
```

### Locator Categories

- **LOGIN** — Email, password, and login button
- **MESSAGE** — Error and success messages
- **USER** — User profile and logout elements
- **SIGNUP** — Initial sign-up form
- **SIGNUP_FORM** — Complete sign-up form fields
- **PRODUCTS** — Product search, filter, and details
- **CART** — Cart modal and buttons

---

## 📦 Fixtures

Test data is stored in `cypress/fixtures/user.json`:

```json
{
  "name": "Usuario de Teste Funcional 2",
  "email": "usertestfunc2@example.com",
  "password": "@@@senha434!"
}
```

**Usage in Tests (Alias Pattern):**

Tests use Cypress aliases to avoid `this` context issues and make code more resilient:

```javascript
describe('Scenario', () => {
  beforeEach(function() {
    // Register fixture as alias before each test
    cy.fixture('user').as('user');
  });

  it('test', function() {
    // Access via alias to avoid context issues
    cy.get('@user').then(({ email, password }) => {
      cy.login(email, password);
    });
  });
});
```

---

## 🏃 Running Tests

### Open Cypress UI
```bash
npm run cypress:open
```
Then select:
- **E2E Testing** → Choose a browser (Chromium, Firefox, etc.) → Select a test file

### Run All Tests (Headless)
```bash
npx cypress run
```

### Run Specific Test
```bash
npx cypress run --spec "cypress/e2e/login.cy.js"
```

### Run with Browser Option
```bash
npx cypress run --browser chrome
npx cypress run --browser firefox
```

---

## ✅ Best Practices Implemented

### 1. **Centralized Locators**
   - Single source of truth for selectors
   - Easy updates when UI changes
   - Better readability

### 2. **Reusable Commands**
   - DRY (Don't Repeat Yourself) principle
   - Common workflows encapsulated
   - Easier to maintain

### 3. **Test Data via Fixtures with Aliases**
   - No hardcoded credentials in tests
   - Easy swap of test data
   - Consistent across all tests
   - **Uses `cy.get('@user').then(...)` instead of `this.user` for greater robustness**

### 4. **Base URL Configuration**
   - Avoids hardcoded URLs
   - Easier to test different environments
   - Cleaner relative paths

### 5. **Fixture Loading in `beforeEach`**
   - Registers alias **before each test** (not just once)
   - Avoids alias unavailability issues
   - Ensures consistent state between runs

### 6. **Resilient and Idempotent Logout**
   - `cy.logout()` doesn't fail if already logged out
   - Checks element existence before clicking
   - Safe to call in repeated `beforeEach` hooks

### 7. **Dynamic Emails in Sign-Up Tests**
   - Uses `Date.now()` to generate unique emails
   - Allows multiple executions without "user already exists"
   - Combines fixture data (name, password) with generated emails

---

## 🔄 Example Workflow

Here's a typical test flow using aliases:

```javascript
describe('Login Flow', () => {
  beforeEach(() => {
    // Register fixture as alias before each test
    cy.fixture('user').as('user');
  });

  beforeEach(() => {
    // Ensure clean state before each test
    cy.visit('/');
    cy.logout();
    cy.visit('/login');
  });

  it('should login successfully', function() {
    // Access data via alias
    cy.get('@user').then(({ email, password }) => {
      cy.login(email, password);
      cy.contains(locators.MESSAGE.LOGGED_IN_AS_TEXT).should('be.visible');
    });
  });
});
```

### Example with Dynamic Email (Sign-Up Tests)

```javascript
it('should create account with unique email', function() {
  const email = `user${Date.now()}@example.com`;
  
  cy.get(locators.SIGNUP.EMAIL).type(email);
  cy.get(locators.SIGNUP.BTN_SIGNUP).click();
  
  cy.url().should('include', '/signup');
  cy.get(locators.SIGNUP_FORM.EMAIL).should('have.value', email);
});
```

---

## 📝 Notes

- Tests use `cypress-xpath` for XPath selectors when needed
- All tests are independent and can be executed in any order
- The fixture user (`Usuario de Teste Funcional 2`) must be pre-registered on the site for login tests
- **Sign-up tests generate dynamic emails with `Date.now()`, allowing repeated execution**
- **Fixtures are loaded via aliases (`cy.get('@user')`) in `beforeEach` for greater robustness**
- **The `cy.logout()` command is idempotent and safe in setup hooks**
- The base URL can be replaced at runtime: `npx cypress run --config baseUrl=https://example.com`

---

## 📚 Resources

- [Cypress Documentation](https://docs.cypress.io/)
- [Testing Best Practices](https://docs.cypress.io/guides/references/best-practices)
- [Custom Commands](https://docs.cypress.io/api/cypress-api/custom-commands)

