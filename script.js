document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.model-button');
    const modelImage = document.getElementById('displayed-image');
    const resetButton = document.getElementById('reset');
    const zoomInButton = document.getElementById('zoom-in');
    const zoomOutButton = document.getElementById('zoom-out');
    const scaleDisplay = document.getElementById('scale-display');
    const fileInput = document.getElementById('file-input');
    const errorMessage = document.getElementById('error-message');

    let currentScale = 1.0;
    let activeButtonId = localStorage.getItem('activeButton') || 'juice';

    const images = {
        'juice': localStorage.getItem('uploadedImage_juice') || 'juice-shop.png',
        'jet': localStorage.getItem('uploadedImage_jet') || 'jet.png',
        'iphone': localStorage.getItem('uploadedImage_iphone') || 'iphone-14.png'
    };

    // Set the initial image
    showImage(activeButtonId);

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            setActiveButton(button.id);
            showImage(button.id);
        });
    });

    // Set active button and image on page load
    setActiveButton(activeButtonId);

    // Show image function
    function showImage(imageId) {
        modelImage.src = images[imageId];
        modelImage.style.width = '500px';  // Ensure images are of the same width
        modelImage.style.height = 'auto';  // Maintain aspect ratio
    }

    // Update scale display
    function updateScaleDisplay(scale) {
        scaleDisplay.textContent = 'Scale: ' + scale.toFixed(1);
    }

    // Reset button functionality
    resetButton.addEventListener('click', () => {
        currentScale = 1.0;
        modelImage.style.transform = `scale(${currentScale})`;
        updateScaleDisplay(currentScale);
        showImage(activeButtonId);
    });

    // Zoom in button functionality
    zoomInButton.addEventListener('click', () => {
        currentScale += 0.1;
        modelImage.style.transform = `scale(${currentScale.toFixed(1)})`;
        updateScaleDisplay(currentScale);
    });

    // Zoom out button functionality
    zoomOutButton.addEventListener('click', () => {
        if (currentScale > 0.1) {
            currentScale -= 0.1;
            modelImage.style.transform = `scale(${currentScale.toFixed(1)})`;
            updateScaleDisplay(currentScale);
        }
    });

    // File input change event
    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const fileType = file.type;
            if (fileType === 'image/jpeg' || fileType === 'image/png') {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const imageDataUrl = e.target.result;
                    images[activeButtonId] = imageDataUrl;
                    localStorage.setItem(`uploadedImage_${activeButtonId}`, imageDataUrl);
                    modelImage.src = imageDataUrl;
                    currentScale = 1.0;
                    modelImage.style.transform = `scale(${currentScale})`;
                    updateScaleDisplay(currentScale);
                    errorMessage.classList.remove('show');
                };
                reader.readAsDataURL(file);
            } else {
                errorMessage.textContent = "Only png/jpg format allowed";
                errorMessage.classList.add('show');
            }
        }
    });

    // Function to set active button
    function setActiveButton(buttonId) {
        activeButtonId = buttonId;
        localStorage.setItem('activeButton', activeButtonId);
        buttons.forEach(button => {
            if (button.id === activeButtonId) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }
});
