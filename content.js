const doobbyStyles = `
<style id="doobby-styles">
    .doobby-tldr-btn,
    .doobby-eli5-btn {
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
    .doobby-eli5-btn:hover {
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

    .doobby-tweet-preview {
        background: #f9fafb;
        padding: 16px;
        border-radius: 8px;
        margin-bottom: 20px;
        border-left: 4px solid #667eea;
    }

    .doobby-tweet-preview strong {
        display: block;
        margin-bottom: 8px;
        color: #374151;
        font-size: 14px;
    }

    .doobby-tweet-preview p {
        margin: 0;
        color: #6b7280;
        line-height: 1.5;
        font-size: 14px;
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

    .doobby-generate-btn:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        transform: none;
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

    @media (max-width: 480px) {
        .doobby-modal-content {
            width: 95%;
            padding: 16px;
        }
        
        .doobby-tldr-btn,
        .doobby-eli5-btn {
            padding: 6px 10px;
            font-size: 11px;
            min-width: 50px;
        }
        
        .doobby-btn-inner svg {
            width: 12px;
            height: 12px;
        }
    }
</style>
`;

if (!document.getElementById('doobby-styles')) {
    document.head.insertAdjacentHTML('beforeend', doobbyStyles);
}

class DoobbyContentAssistant {
    constructor() {
        this.apiKey = null;
        this.observer = null;
        this.init();
    }

    async init() {
        await this.loadApiKey();
        
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.startObserving());
        } else {
            this.startObserving();
        }
        
        chrome.runtime.onMessage.addListener((request) => {
            if (request.action === 'apiKeyUpdated') {
                this.apiKey = request.apiKey;
            } else if (request.action === 'apiKeyDeleted') {
                this.apiKey = null;
            }
        });
    }
    
    async loadApiKey() {
        try {
            const result = await chrome.storage.sync.get(['apiKey']);
            this.apiKey = result.apiKey || null;
        } catch (error) {
            this.apiKey = null;
        }
    }

    startObserving() {
        this.observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    this.addButtonsToContent();
                }
            });
        });

        this.observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        this.addButtonsToContent();
    }

    addButtonsToContent() {
        const tweets = document.querySelectorAll('[data-testid="tweet"]:not([data-doobby-processed])');
        
        tweets.forEach((tweet, index) => {
            this.addContentButtons(tweet);
        });
        
        const articles = document.querySelectorAll('article:not([data-doobby-processed])');
        
        articles.forEach((article, index) => {
            this.addContentButtons(article);
        });
    }

    addContentButtons(contentElement) {
        try {
            contentElement.setAttribute('data-doobby-processed', 'true');

            const replyButton = contentElement.querySelector('[data-testid="reply"]');
            const isReplyTweet = replyButton && 
                                replyButton.getAttribute('aria-label')?.includes('Reply to');
            
            if (isReplyTweet) {
                return;
            }

            let actionButtons = contentElement.querySelector('[role="group"]');
            
            if (!actionButtons) {
                actionButtons = contentElement.querySelector('[data-testid="toolBar"]');
            }
            
            if (!actionButtons) {
                const possibleContainers = contentElement.querySelectorAll('div');
                for (const container of possibleContainers) {
                    if (container.querySelector('[data-testid="reply"]') || 
                        container.querySelector('[data-testid="retweet"]') || 
                        container.querySelector('[data-testid="like"]')) {
                        actionButtons = container;
                        break;
                    }
                }
            }
            
            if (!actionButtons) {
                return;
            }

            if (actionButtons.querySelector('.doobby-tldr-btn') || actionButtons.querySelector('.doobby-eli5-btn')) {
                return;
            }

            const tldrButton = document.createElement('div');
            tldrButton.className = 'doobby-tldr-btn';
            tldrButton.innerHTML = `
                <div class="doobby-btn-inner">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
                    </svg>
                    <span>TLDR</span>
                </div>
            `;

            tldrButton.addEventListener('click', (e) => {
                e.stopPropagation();
                this.showTLDRModal(contentElement);
            });

            const eli5Button = document.createElement('div');
            eli5Button.className = 'doobby-eli5-btn';
            eli5Button.innerHTML = `
                <div class="doobby-btn-inner">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
                    </svg>
                    <span>ELI5</span>
                </div>
            `;

            eli5Button.addEventListener('click', (e) => {
                e.stopPropagation();
                this.showELI5Modal(contentElement);
            });

            actionButtons.appendChild(tldrButton);
            actionButtons.appendChild(eli5Button);

        } catch (error) {
        }
    }

    showTLDRModal(contentElement) {
        const contentText = this.extractContentText(contentElement);
        
        const modal = document.createElement('div');
        modal.className = 'doobby-modal';
        modal.innerHTML = `
            <div class="doobby-modal-content">
                <div class="doobby-header">
                    <h3>DOOBBY AI - TLDR Summary</h3>
                    <button class="doobby-close">&times;</button>
                </div>
                <div class="doobby-loading">
                    <div class="spinner"></div>
                    <p>Generating TLDR...</p>
                </div>
                <div class="doobby-result" id="doobby-result"></div>
                <div class="doobby-actions" style="display: none;">
                    <button class="doobby-generate-btn">Generate Again</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        modal.querySelector('.doobby-close')?.addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });

        this.generateTLDR(contentText, modal);
    }

    showELI5Modal(contentElement) {
        const contentText = this.extractContentText(contentElement);
        
        const modal = document.createElement('div');
        modal.className = 'doobby-modal';
        modal.innerHTML = `
            <div class="doobby-modal-content">
                <div class="doobby-header">
                    <h3>DOOBBY AI - ELI5 Explanation</h3>
                    <button class="doobby-close">&times;</button>
                </div>
                <div class="doobby-loading">
                    <div class="spinner"></div>
                    <p>Generating ELI5 explanation...</p>
                </div>
                <div class="doobby-result" id="doobby-result"></div>
                <div class="doobby-actions" style="display: none;">
                    <button class="doobby-generate-btn">Generate Again</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        modal.querySelector('.doobby-close')?.addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });

        this.generateELI5(contentText, modal);
    }

    extractContentText(contentElement) {
        try {
            const articleContent = contentElement.querySelector('[data-testid="tweetText"]');
            if (articleContent) {
                const text = articleContent.textContent || '';
                if (text.length > 50) {
                    return text;
                }
            }

            const articleSelectors = [
                '[data-testid="tweetText"]',
                'div[data-testid="tweetText"]',
                'span[data-testid="tweetText"]',
                'div[lang]',
                'span[lang]',
                'article div',
                'article span',
                '[role="article"] div',
                '[role="article"] span'
            ];

            for (const selector of articleSelectors) {
                const elements = contentElement.querySelectorAll(selector);
                for (const element of elements) {
                    const text = element.textContent?.trim();
                    if (text && text.length > 20) {
                        return text;
                    }
                }
            }

            const allTextElements = contentElement.querySelectorAll('div, span, p');
            let longestText = '';
            
            for (const element of allTextElements) {
                const text = element.textContent?.trim();
                if (text && text.length > longestText.length && text.length > 10) {
                    longestText = text;
                }
            }

            if (longestText) {
                return longestText;
            }

            return 'Could not extract content text';
        } catch (error) {
            return 'Error extracting content text';
        }
    }

    async generateTLDR(contentText, modal) {
        const loadingDiv = modal.querySelector('.doobby-loading');
        const resultDiv = modal.querySelector('#doobby-result');
        const actionsDiv = modal.querySelector('.doobby-actions');
        const generateBtn = modal.querySelector('.doobby-generate-btn');

        loadingDiv.style.display = 'block';
        resultDiv.innerHTML = '';
        actionsDiv.style.display = 'none';

        try {
            const tldr = await this.callDoobbyAPI(contentText, 'tldr');
            this.displayResult(tldr, resultDiv, 'TLDR Summary');
        } catch (error) {
            resultDiv.innerHTML = `
                <div class="doobby-error">
                    <p>Error generating TLDR. Please try again.</p>
                    <small>${error.message}</small>
                </div>
            `;
        } finally {
            loadingDiv.style.display = 'none';
            actionsDiv.style.display = 'block';
            
            generateBtn.addEventListener('click', () => {
                this.generateTLDR(contentText, modal);
            });
        }
    }

    async generateELI5(contentText, modal) {
        const loadingDiv = modal.querySelector('.doobby-loading');
        const resultDiv = modal.querySelector('#doobby-result');
        const actionsDiv = modal.querySelector('.doobby-actions');
        const generateBtn = modal.querySelector('.doobby-generate-btn');

        loadingDiv.style.display = 'block';
        resultDiv.innerHTML = '';
        actionsDiv.style.display = 'none';

        try {
            const eli5 = await this.callDoobbyAPI(contentText, 'eli5');
            this.displayResult(eli5, resultDiv, 'ELI5 Explanation');
        } catch (error) {
            resultDiv.innerHTML = `
                <div class="doobby-error">
                    <p>Error generating ELI5 explanation. Please try again.</p>
                    <small>${error.message}</small>
                </div>
            `;
        } finally {
            loadingDiv.style.display = 'none';
            actionsDiv.style.display = 'block';
            
            generateBtn.addEventListener('click', () => {
                this.generateELI5(contentText, modal);
            });
        }
    }

    async callDoobbyAPI(contentText, type = 'tldr') {
        if (!this.apiKey) {
            throw new Error('No API key configured. Please set your Fireworks API key in the extension popup.');
        }
        
        let prompt;
        
        if (type === 'tldr') {
            prompt = `Provide a concise TLDR (Too Long; Didn't Read) summary of this content in 1-2 sentences:

Content: "${contentText}"

Requirements:
- Keep it brief and to the point
- Capture the main message or key points
- Use simple, clear language
- No emojis or special formatting
- Maximum 3 sentences`;
        } else if (type === 'eli5') {
            prompt = `Explain this content like I'm 5 years old (ELI5). Make it simple and easy to understand:

Content: "${contentText}"

Requirements:
- Use simple, everyday language a 5-year-old would understand
- Avoid complex jargon or technical terms
- Use analogies or examples if helpful
- Keep it friendly and engaging
- Provide a detailed explanation that's easy to follow
- Use examples and analogies to make complex topics simple
- No emojis or special formatting
- Make it comprehensive but still simple enough for a 5-year-old`;
        } else {
            throw new Error('Invalid generation type');
        }

        try {
            const response = await fetch("https://api.fireworks.ai/inference/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.apiKey}`
                },
                body: JSON.stringify({
                    model: "accounts/sentientfoundation-serverless/models/dobby-mini-unhinged-plus-llama-3-1-8b",
                    max_tokens: type === 'eli5' ? 50000 : 5000,
                    stream: type === 'eli5',
                    top_p: 1,
                    top_k: 40,
                    presence_penalty: 0,
                    frequency_penalty: 0,
                    temperature: type === 'eli5' ? 0.7 : 0.6,
                    messages: [
                        {
                            role: "user",
                            content: prompt
                        }
                    ]
                })
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`API request failed: ${response.status} ${response.statusText}`);
            }

            if (type === 'eli5') {
                const reader = response.body.getReader();
                const decoder = new TextDecoder();
                let fullContent = '';
                
                try {
                    while (true) {
                        const { done, value } = await reader.read();
                        if (done) break;
                        
                        const chunk = decoder.decode(value);
                        const lines = chunk.split('\n');
                        
                        for (const line of lines) {
                            if (line.startsWith('data: ')) {
                                const data = line.slice(6);
                                if (data === '[DONE]') break;
                                
                                try {
                                    const parsed = JSON.parse(data);
                                    if (parsed.choices && parsed.choices[0] && parsed.choices[0].delta && parsed.choices[0].delta.content) {
                                        fullContent += parsed.choices[0].delta.content;
                                    }
                                } catch (e) {
                                }
                            }
                        }
                    }
                } finally {
                    reader.releaseLock();
                }
                
                return this.cleanResult(fullContent);
            } else {
                const data = await response.json();
                
                if (!data.choices || !data.choices[0] || !data.choices[0].message) {
                    throw new Error('Invalid API response format');
                }
                
                const content = data.choices[0].message.content;

                if (type === 'tldr') {
                    return this.cleanResult(content);
                } else if (type === 'eli5') {
                    return this.cleanResult(content);
                } else {
                    throw new Error('Invalid generation type');
                }
            }
        } catch (error) {
            throw error;
        }
    }

    cleanResult(content) {
        content = content.replace(/\*\*(.*?)\*\*/g, '$1');
        content = content.replace(/__(.*?)__/g, '$1');
        content = content.replace(/\*(.*?)\*/g, '$1');
        content = content.replace(/_(.*?)_/g, '$1');
        
        content = content.replace(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '');
        
        content = content.replace(/[""]/g, '');
        content = content.replace(/['']/g, '');
        
        content = content.replace(/\s+/g, ' ').trim();
        
        return content;
    }

    displayResult(result, container, title) {
        container.innerHTML = `
            <div class="doobby-result-item">
                <div class="doobby-result-header">
                    <span class="doobby-result-title">${title}</span>
                    <button class="doobby-copy-btn" data-result="${result}">Copy</button>
                </div>
                <div class="doobby-result-text">${result}</div>
            </div>
        `;

        const copyBtn = container.querySelector('.doobby-copy-btn');
        copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(result).then(() => {
                copyBtn.textContent = 'Copied!';
                setTimeout(() => {
                    copyBtn.textContent = 'Copy';
                }, 2000);
            });
        });
    }
}

new DoobbyContentAssistant();