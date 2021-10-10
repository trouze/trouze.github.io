$(document).ajaxStop( function() {
    const codeBlocks = document.querySelectorAll('.code-header + .highlighter-rouge');
    const copyCodeButtons = document.querySelectorAll('.copy-code-button');
    copyCodeButtons.forEach((copyCodeButton, index) => {
        copyCodeButton.addEventListener('click', () => {
            window.navigator.clipboard.writeText(codeBlocks[index].innerText);
            copyCodeButton.classList.add('copied');
            setTimeout(() => {
                copyCodeButton.classList.remove('copied');
            }, 2e3);
        });
    });
});