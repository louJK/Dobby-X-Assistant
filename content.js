const doobbyStyles = `
<style id="doobby-styles">
    .doobby-tldr-btn,
    .doobby-reply-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 8px 12px;
        margin: 0 4px;
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        border: none;
        border-radius: 20px;
        font-size: 12px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        text-decoration: none;
        min-width: 60px;
        height: 32px;
        position: relative;
        overflow: hidden;
    }

    .doobby-tldr-btn:hover,
    .doobby-reply-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(102, 126, 234, 0.3);
    }

    .doobby-btn-inner {
        display: flex;
        align-items: center;
        gap: 6px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }

    .doobby-btn-inner svg {
        width: 14px;
        height: 14px;
    }

    .doobby-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 999999;
        backdrop-filter: blur(5px);
    }

    .doobby-modal-content {
        background: white;
        border-radius: 16px;
        padding: 24px;
        max-width: 500px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        position: relative;
    }

    .doobby-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        padding-bottom: 16px;
        border-bottom: 1px solid #e5e7eb;
        position: relative;
    }

    .doobby-header h3 {
        margin: 0;
        font-size: 18px;
        font-weight: 600;
        color: #1f2937;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        text-align: center;
        flex: 1;
    }

    .doobby-close {
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: #6b7280;
        padding: 4px;
        border-radius: 4px;
        transition: all 0.2s ease;
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
    }

    .doobby-close:hover {
        background: #f3f4f6;
        color: #374151;
    }

    .doobby-loading {
        text-align: center;
        padding: 20px;
        color: #6b7280;
    }

    .spinner {
        width: 40px;
        height: 40px;
        border: 3px solid #f3f4f6;
        border-top: 3px solid #667eea;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 16px;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

    .doobby-actions {
        margin-top: 20px;
        text-align: center;
    }

    .doobby-generate-btn {
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }

    .doobby-generate-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(102, 126, 234, 0.3);
    }

    .doobby-result {
        margin-top: 20px;
    }

    .doobby-result-item {
        background: #f9fafb;
        border-radius: 8px;
        padding: 16px;
        margin-bottom: 16px;
        border: 1px solid #e5e7eb;
    }

    .doobby-result-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;
    }

    .doobby-result-title {
        font-weight: 600;
        color: #374151;
        font-size: 14px;
    }

    .doobby-copy-btn {
        background: #667eea;
        color: white;
        border: none;
        padding: 6px 12px;
        border-radius: 6px;
        font-size: 12px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }

    .doobby-copy-btn:hover {
        background: #5a67d8;
    }

    .doobby-result-text {
        color: #374151;
        line-height: 1.6;
        font-size: 14px;
        white-space: pre-wrap;
    }

    .doobby-error {
        background: #fef2f2;
        border: 1px solid #fecaca;
        border-radius: 8px;
        padding: 16px;
        color: #991b1b;
    }

    .doobby-error p {
        margin: 0 0 8px 0;
        font-weight: 500;
    }

    .doobby-error small {
        font-size: 12px;
        opacity: 0.8;
    }
</style>
`;

if (!document.getElementById('doobby-styles')) {
    document.head.insertAdjacentHTML('beforeend', doobbyStyles);
}

class DoobbyContentAssistant {
    constructor() {
        this.apiKey = null;
        this.init();
    }

    async init() {
        await this.loadApiKey();
        this.startObserving();
        chrome.runtime.onMessage.addListener((request) => {
            if (request.action === 'apiKeyUpdated') this.apiKey = request.apiKey;
            if (request.action === 'apiKeyDeleted') this.apiKey = null;
        });
    }

    async loadApiKey() {
        const result = await chrome.storage.sync.get(['apiKey']);
        this.apiKey = result.apiKey || null;
    }

    startObserving() {
        const observer = new MutationObserver(() => this.addButtonsToContent());
        observer.observe(document.body, { childList: true, subtree: true });
        this.addButtonsToContent();
    }

    addButtonsToContent() {
        const tweets = document.querySelectorAll('[data-testid="tweet"]:not([data-doobby-processed])');
        tweets.forEach((tweet) => this.addContentButtons(tweet));
    }

    addContentButtons(contentElement) {
        contentElement.setAttribute('data-doobby-processed', 'true');
        const actionButtons = contentElement.querySelector('[role="group"]');
        if (!actionButtons) return;

        if (actionButtons.querySelector('.doobby-tldr-btn') || actionButtons.querySelector('.doobby-reply-btn')) return;

        const tldrButton = document.createElement('div');
        tldrButton.className = 'doobby-tldr-btn';
        tldrButton.innerHTML = `<div class="doobby-btn-inner"><span>TLDR</span></div>`;
        tldrButton.addEventListener('click', () => this.showTLDRModal(contentElement));

        const replyButton = document.createElement('div');
        replyButton.className = 'doobby-reply-btn';
        replyButton.innerHTML = `<div class="doobby-btn-inner"><span>Reply</span></div>`;
        replyButton.addEventListener('click', () => this.showReplyModal(contentElement));

        actionButtons.appendChild(tldrButton);
        actionButtons.appendChild(replyButton);
    }

    extractContentText(contentElement) {
        const textEl = contentElement.querySelector('[data-testid="tweetText"]');
        return textEl ? textEl.textContent.trim() : 'Could not extract content';
    }

    showTLDRModal(contentElement) {
        this.showModal("DOOBBY AI - TLDR Summary", "Generating TLDR...", contentElement, "tldr");
    }

    showReplyModal(contentElement) {
        this.showModal("DOOBBY AI - Tweet Reply", "Generating reply...", contentElement, "reply");
    }

    showModal(title, loadingText, contentElement, type) {
        const modal = document.createElement('div');
        modal.className = 'doobby-modal';
        modal.innerHTML = `
          <div class="doobby-modal-content">
            <div class="doobby-header">
              <h3>${title}</h3>
              <button class="doobby-close">&times;</button>
            </div>
            <div class="doobby-loading"><div class="spinner"></div><p>${loadingText}</p></div>
            <div class="doobby-result" id="doobby-result"></div>
            <div class="doobby-actions" style="display:none;">
              <button class="doobby-generate-btn">Generate Again</button>
            </div>
          </div>`;
        document.body.appendChild(modal);

        modal.querySelector('.doobby-close').addEventListener('click', () => modal.remove());
        modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });

        this.generate(contentElement, modal, type);
    }

    async generate(contentElement, modal, type) {
        const text = this.extractContentText(contentElement);
        const loadingDiv = modal.querySelector('.doobby-loading');
        const resultDiv = modal.querySelector('#doobby-result');
        const actionsDiv = modal.querySelector('.doobby-actions');
        const btn = modal.querySelector('.doobby-generate-btn');

        loadingDiv.style.display = 'block';
        resultDiv.innerHTML = '';
        actionsDiv.style.display = 'none';

        try {
            const result = await this.callDoobbyAPI(text, type);
            this.displayResult(result, resultDiv, type === "reply" ? "Reply" : "TLDR");
        } catch (err) {
            resultDiv.innerHTML = `<div class="doobby-error"><p>Error: ${err.message}</p></div>`;
        } finally {
            loadingDiv.style.display = 'none';
            actionsDiv.style.display = 'block';
            btn.onclick = () => this.generate(contentElement, modal, type);
        }
    }

    async callDoobbyAPI(contentText, type) {
        if (!this.apiKey) throw new Error("No API key set.");

        let prompt;
        if (type === "tldr") {
            prompt = `Summarize this tweet in 1-2 sentences:\n\n${contentText}`;
        } else if (type === "reply") {
            prompt = `Write a natural Twitter reply to this tweet:\n\n"${contentText}"\n\nRequirements:
- No quotes around the reply
- Short, engaging, natural tweet style
- Add at least one relevant hashtag with #
- No emojis`;
        }

        const res = await fetch("https://api.fireworks.ai/inference/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${this.apiKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "accounts/sentientfoundation-serverless/models/dobby-mini-unhinged-plus-llama-3-1-8b",
                max_tokens: 500,
                messages: [{ role: "user", content: prompt }]
            })
        });

        const data = await res.json();
        const output = data?.choices?.[0]?.message?.content || "";
        return this.cleanResult(output);
    }

    cleanResult(content) {
        return content.replace(/^"+|"+$/g, "").trim();
    }

    displayResult(result, container, title) {
        container.innerHTML = `
          <div class="doobby-result-item">
            <div class="doobby-result-header">
              <span class="doobby-result-title">${title}</span>
              <button class="doobby-copy-btn">Copy</button>
            </div>
            <div class="doobby-result-text">${result}</div>
          </div>`;
        container.querySelector('.doobby-copy-btn').onclick = () => navigator.clipboard.writeText(result);
    }
}

new DoobbyContentAssistant();
