class PopupManager {
    constructor() {
        this.apiKeyInput = document.getElementById('apiKeyInput');
        this.saveBtn = document.getElementById('saveBtn');
        this.showBtn = document.getElementById('showBtn');
        this.deleteBtn = document.getElementById('deleteBtn');
        this.statusBar = document.getElementById('statusBar');
        this.statusDot = document.getElementById('statusDot');
        this.statusText = document.getElementById('statusText');
        this.messageContainer = document.getElementById('messageContainer');
        
        this.isVisible = false;
        this.init();
    }
    
    init() {
        this.loadApiKey();
        this.setupEventListeners();
        this.updateStatus();
        this.setupScrollIsolation();
    }
    
    setupScrollIsolation() {
        const content = document.querySelector('.content');
        const container = document.querySelector('.container');
        
        const preventScrollPropagation = (e) => {
            e.stopPropagation();
            e.preventDefault();
            
            const scrollAmount = e.deltaY;
            content.scrollTop += scrollAmount;
        };
        
        container.addEventListener('wheel', preventScrollPropagation, { passive: false });
        content.addEventListener('wheel', preventScrollPropagation, { passive: false });
        
        const preventTouchPropagation = (e) => {
            e.stopPropagation();
        };
        
        container.addEventListener('touchstart', preventTouchPropagation, { passive: false });
        container.addEventListener('touchmove', preventTouchPropagation, { passive: false });
        container.addEventListener('touchend', preventTouchPropagation, { passive: false });
        
        const preventKeyPropagation = (e) => {
            if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(e.key)) {
                e.stopPropagation();
            }
        };
        
        document.addEventListener('keydown', preventKeyPropagation, { passive: false });
    }
    
    setupEventListeners() {
        this.saveBtn.addEventListener('click', () => this.saveApiKey());
        this.showBtn.addEventListener('click', () => this.toggleVisibility());
        this.deleteBtn.addEventListener('click', () => this.deleteApiKey());
        this.apiKeyInput.addEventListener('input', () => this.updateStatus());
        this.apiKeyInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.saveApiKey();
            }
        });
    }
    
    async loadApiKey() {
        try {
            const result = await chrome.storage.sync.get(['apiKey']);
            if (result.apiKey) {
                this.apiKeyInput.value = result.apiKey;
                this.updateStatus();
            }
        } catch (error) {
        }
    }
    
    async saveApiKey() {
        const apiKey = this.apiKeyInput.value.trim();
        
        if (!apiKey) {
            this.showMessage('Please enter an API key', 'error');
            return;
        }
        
        if (!this.isValidApiKey(apiKey)) {
            this.showMessage('Please enter a valid Fireworks AI API key', 'error');
            return;
        }
        
        try {
            await chrome.storage.sync.set({ apiKey: apiKey });
            this.showMessage('API key saved successfully!', 'success');
            this.updateStatus();
            
            try {
                const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
                if (tab && (tab.url.includes('twitter.com') || tab.url.includes('x.com'))) {
                    await chrome.tabs.sendMessage(tab.id, { action: 'apiKeyUpdated', apiKey: apiKey });
                }
            } catch (error) {
            }
        } catch (error) {
            this.showMessage('Error saving API key', 'error');
        }
    }
    
    async deleteApiKey() {
        try {
            await chrome.storage.sync.remove(['apiKey']);
            this.apiKeyInput.value = '';
            this.showMessage('API key deleted successfully!', 'success');
            this.updateStatus();
            
            try {
                const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
                if (tab && (tab.url.includes('twitter.com') || tab.url.includes('x.com'))) {
                    await chrome.tabs.sendMessage(tab.id, { action: 'apiKeyDeleted' });
                }
            } catch (error) {
            }
        } catch (error) {
            this.showMessage('Error deleting API key', 'error');
        }
    }
    
    toggleVisibility() {
        this.isVisible = !this.isVisible;
        this.apiKeyInput.type = this.isVisible ? 'text' : 'password';
        this.showBtn.innerHTML = this.isVisible ? 
            '<svg class="btn-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>Hide' :
            '<svg class="btn-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/></svg>Show';
    }
    
    updateStatus() {
        const apiKey = this.apiKeyInput.value.trim();
        
        if (!apiKey) {
            this.statusBar.className = 'status-bar';
            this.statusDot.className = 'status-dot';
            this.statusText.className = 'status-text';
            this.statusText.textContent = 'No API key configured';
            return;
        }
        
        if (this.isValidApiKey(apiKey)) {
            this.statusBar.className = 'status-bar valid';
            this.statusDot.className = 'status-dot valid';
            this.statusText.className = 'status-text valid';
            this.statusText.textContent = 'Valid API key';
        } else {
            this.statusBar.className = 'status-bar';
            this.statusDot.className = 'status-dot';
            this.statusText.className = 'status-text';
            this.statusText.textContent = 'Invalid API key format';
        }
    }
    
    isValidApiKey(apiKey) {
        return apiKey.startsWith('fw_');
    }
    
    showMessage(message, type) {
        this.messageContainer.innerHTML = `
            <div class="message ${type}">
                <svg class="message-icon" viewBox="0 0 24 24" fill="currentColor">
                    ${type === 'success' ? 
                        '<path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>' :
                        '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>'
                    }
                </svg>
                ${message}
            </div>
        `;
        
        setTimeout(() => {
            this.messageContainer.innerHTML = '';
        }, 3000);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new PopupManager();
}); 