# 🏯 Proyecto Hackathon: El Legado del Shōgun

## 🎌 1. Contexto y Narrativa

El Shōgun está en su lecho de muerte y le quedan solo 10 horas. Su hijo y heredero tiene 5 años, es demasiado joven para gobernar. El poder se ha descentralizado temporalmente entre 250 señores feudales, los Daimyō, quienes ahora deben gestionar los recursos del reino, defenderlo de ataques y asegurar que el poder vuelva al heredero legítimo cuando cumpla 16 años.

**El objetivo es construir la dApp que gestiona este sistema en la blockchain de Cardano.**

---

## 🎯 2. Requerimientos Funcionales

### A. Gestión de Daimyō y Recursos
- El sistema debe soportar a **250 Daimyō** (representados por wallets de Cardano).
- Cada Daimyō debe poder poseer 3 tipos de recursos:
    - 🏞️ **Tierras** (Posiblemente como NFTs)
    - ⚔️ **Soldados** (Tokens Nativos)
    - 🌾 **Arroz** (Tokens Nativos)
- Los Daimyō deben poder transferirse estos recursos entre ellos.

### B. La Tesorería del Heredero
- **Tributo del 2%:** Cada transacción de recursos entre Daimyō debe pagar automáticamente un tributo del 2% a una tesorería central.
- **Bloqueo por Tiempo (Time Lock):** La tesorería debe estar bloqueada. Nadie podrá acceder a ella hasta que el heredero cumpla 16 años (es decir, dentro de 11 años desde la fecha actual `2025-11-14`).
- Cuando el tiempo se cumpla, una única wallet (la del heredero) podrá reclamar todos los fondos acumulados en la tesorería.

### C. Campañas para Defender el Reino (Crowdfunding)
Este es un sistema de financiación colectiva para objetivos comunes.

1.  **Creación de Campaña:**
    - Se define una **meta** de recursos (ej: 5,000 ⚔️ y 10,000 🌾).
    - Se establece una **fecha límite**.
2.  **Fase de Donación:**
    - Los Daimyō pueden enviar sus recursos a un smart contract específico de la campaña, donde quedan bloqueados.
3.  **Resultado de la Campaña:**
    - **ÉXITO (Meta alcanzada):**
        - Los fondos se liberan a una wallet designada para la defensa.
        - Los donantes reciben un **"Token de Lealtad"** (un NFT) como prueba de su contribución. Este token registra el valor de lo que donaron.
        - **Recompensa Futura:** Cuando el heredero acceda a la tesorería, los poseedores del "Token de Lealtad" podrán quemarlo para reclamar el **120%** del valor de su donación original de la tesorería principal.
    - **FRACASO (Meta no alcanzada):**
        - La campaña se invalida.
        - Los donantes pueden interactuar con el contrato para **reclamar el 100% de su donación** de vuelta.

---

## 🛠️ 3. Stack Tecnológico y Arquitectura

### A. Stack Tecnológico
- **Blockchain:** Cardano (Preprod Testnet)
- **Smart Contracts:** [Aiken](https://aiken-lang.org/)
- **Frontend:** Angular con [Tailwind CSS](https://tailwindcss.com/)
- **Conexión a Wallet:** `@cardano-foundation/cardano-connect-with-wallet-core`
- **Servicio Backend (Orquestador):** Un servidor ligero (ej. Node.js/Express o Python/FastAPI) para ayudar a construir las transacciones.
- **Interacción con la Blockchain (desde el backend):** [Blockfrost API](https://blockfrost.io/) o un nodo propio.

### B. Arquitectura Propuesta

El sistema se divide en 3 componentes principales:

1.  **Frontend (dApp en Angular):**
    - Es la interfaz de usuario para los Daimyō.
    - Gestiona la conexión con las wallets (Nami, Eternl, etc.).
    - Muestra los recursos, las campañas y el historial.
    - **NO construye transacciones complejas.** Su rol es solicitar al backend service que las construya.
    - Recibe la transacción sin firmar del backend, la pasa a la wallet del usuario para que la firme, y luego la envía a la blockchain.

2.  **Backend Service (El Orquestador):**
    - Actúa como un intermediario entre el frontend y la complejidad de Cardano.
    - Expone endpoints de API simples (ej. `POST /api/transfer`, `POST /api/donate`).
    - Recibe la intención del usuario desde el frontend (ej: "enviar 100 arroz a tal persona").
    - Usa librerías de Cardano (como `cardano-serialization-lib`) para construir el cuerpo de la transacción (`unsigned tx`), incluyendo los `datums`, `redeemers` y las direcciones de los scripts correctos.
    - Devuelve la transacción sin firmar (en formato CBOR) al frontend.

3.  **Smart Contracts (Aiken en Cardano):**
    - **Validador de Tributo:** Se ejecuta en cada transferencia para asegurar que el 2% va a la tesorería.
    - **Script de Tesorería (Time Lock):** Protege los fondos del tributo y solo permite el retiro por parte del heredero después de la fecha límite.
    - **Validador de Campañas:** El contrato principal que gestiona la lógica de crowdfunding (recibir donaciones, verificar la meta, y permitir el reembolso o la liberación de fondos).

---

## ✅ 4. Tareas Clave para el LLM

- Ayudar a estructurar el proyecto en Angular.
- Proporcionar ejemplos de código para usar `cardano-connect-with-wallet-core`.
- Sugerir el diseño de los componentes de Angular (Dashboard, TransferModal, CampaignList).
- Esbozar la API que el Backend Service debería exponer.
- Dar ejemplos de cómo sería el flujo de datos entre el Frontend, el Backend Service y la Wallet.