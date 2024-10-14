const scanCardTitle = document.getElementById('scan_card_title');
const infoContainer = document.getElementById('info-container');
const target0 = document.getElementById('target-0')
const target1 = document.getElementById('target-1')

function hideScanMessage() {
    scanCardTitle.style.display = 'none';
}

function showInfoContainer() {
    infoContainer.style.display = 'block';
}

function resetUI() {
    scanCardTitle.style.display = 'block';
    infoContainer.style.display = 'none';
}

target0.addEventListener('targetFound', hideScanMessage);
target0.addEventListener('targetLost', resetUI);

target1.addEventListener('targetFound', () => {
    hideScanMessage();
    showInfoContainer();
});

target1.addEventListener('targetLost', resetUI);