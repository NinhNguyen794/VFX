// Load Header and Footer
        document.addEventListener('DOMContentLoaded', function() {
            // Load header component
        fetch('/en/header.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('header-placeholder').innerHTML = data;
                // Add active class to news link
                    setTimeout(() => {
                        const newsLink = document.getElementById('index-link');
                        if (newsLink) {
                            newsLink.classList.add('active');
                        }
                    }, 100);
                });

            // Load Footer
            fetch('/en/footer.html')
                .then(response => response.text())
                .then(data => {
                    document.getElementById('footer-placeholder').innerHTML = data;
                });
            });

        // VFX là gì
        document.addEventListener('DOMContentLoaded', function() {
            // Get carousel and feature cards
            const carousel = document.getElementById('conceptCarousel');
            const featureCards = document.querySelectorAll('.feature-card');
            
            // Add click event to feature cards
            featureCards.forEach(card => {
                card.addEventListener('click', function() {
                    // Remove active class from all cards
                    featureCards.forEach(c => c.classList.remove('active'));
                    // Add active class to clicked card
                    this.classList.add('active');
                });
            });
            
            // Listen for carousel slide event
            carousel.addEventListener('slide.bs.carousel', function(event) {
                // Get the index of the next slide
                const slideIndex = event.to;
                
                // Remove active class from all cards
                featureCards.forEach(card => card.classList.remove('active'));
                
                // Add active class to the corresponding card
                featureCards[slideIndex].classList.add('active');
            });
        });

        // doi tac chien luoc
        // Tạm dừng animation khi hover
        document.querySelector('.partners-track').addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
        });
        
        document.querySelector('.partners-track').addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
        });

        //news section
        // JavaScript để thay thế hình ảnh placeholder bằng hình ảnh thực tế từ mẫu
document.addEventListener("DOMContentLoaded", function() {
    // Hình ảnh thực tế cho các bài viết tin tức (từ mẫu của bạn)
    const newsImages = [
        "URL_HINH_THI_TRUONG",  // URL hình thị trường Fintech
        "URL_HINH_XU_HUONG",    // URL hình xu hướng công nghệ tài chính
        "URL_HINH_GOI_VON"      // URL hình startup gọi vốn
    ];
    
    // Thay thế các placeholder images khi chúng được tải
    const cardImages = document.querySelectorAll("#news .card-img-top");
    
    // Chỉ thay thế nếu có URL thực tế
    cardImages.forEach((img, index) => {
        if (newsImages[index] && newsImages[index] !== "URL_HINH_THI_TRUONG" && 
            newsImages[index] !== "URL_HINH_XU_HUONG" && newsImages[index] !== "URL_HINH_GOI_VON") {
            img.src = newsImages[index];
        }
    });
});
    // js cua chatbot
    // Chat Widget Functionality
document.addEventListener('DOMContentLoaded', function() {
    const chatToggleBtn = document.getElementById('chat-toggle-btn');
    const chatWindow = document.getElementById('chat-window');
    const chatCloseBtn = document.getElementById('chat-close-btn');
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');
    const chatBody = document.getElementById('chat-body');
    
    // Toggle chat window
    if (chatToggleBtn) {
        chatToggleBtn.addEventListener('click', function() {
            chatWindow.classList.toggle('active');
        });
    }
    
    // Close chat window
    if (chatCloseBtn) {
        chatCloseBtn.addEventListener('click', function() {
            chatWindow.classList.remove('active');
        });
    }
    
    // Send message function
    async function sendMessage() {
        const input = chatInput.value.trim();
        if (input !== '') {
            // Add user message to chat
            addMessage(input, 'sent');
            
            // Clear input field
            chatInput.value = '';
            
            try {
                // Show loading indicator
                const loadingMessage = addMessage('Đang xử lý...', 'loading');
                
                // Send message to API
                const res = await fetch("https://3e3b-14-224-167-99.ngrok-free.app/VFX", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ message: input })
                });
                
                // Remove loading message
                if (loadingMessage) {
                    chatBody.removeChild(loadingMessage);
                }
                
                // Process response
                if (res.ok) {
                    const data = await res.json();
                    // Add bot response to chat
                    addMessage(data.response, 'received');
                } else {
                    addMessage('Không thể kết nối đến máy chủ. Vui lòng thử lại sau.', 'error');
                }
            } catch (error) {
                addMessage('Đã xảy ra lỗi. Vui lòng thử lại sau.', 'error');
                console.error('Error:', error);
            }
        }
    }
    
    // Add message to chat
    function addMessage(text, type) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', type);
        messageDiv.textContent = text;
        chatBody.appendChild(messageDiv);
        chatBody.scrollTop = chatBody.scrollHeight; // Auto-scroll to bottom
        return messageDiv;
    }
    
    // Send on button click
    if (sendBtn) {
        sendBtn.addEventListener('click', sendMessage);
    }
    
    // Send on enter key
    if (chatInput) {
        chatInput.addEventListener('keydown', function(event) {
            if (event.key === "Enter") {
                sendMessage();
            }
        });
    }
    
    // Add initial bot message
    setTimeout(() => {
        addMessage("VFX SÀN GỌI VỐN VIỆT NAM XIN CHÀO. CHÚNG TÔI CÓ THỂ GIÚP GÌ CHO BẠN?", 'received');
    }, 500);
});

function switchLanguage(lang) {
        const currentPath = window.location.pathname;

        // Tách path thành mảng
        const pathParts = currentPath.split('/').filter(p => p !== '');
        
        // Kiểm tra nếu đã có /vi hoặc /en
        if (pathParts[0] === 'vi' || pathParts[0] === 'en') {
            pathParts[0] = lang; // thay đổi ngôn ngữ
        } else {
            pathParts.unshift(lang); // thêm ngôn ngữ vào đầu
        }

        // Chuyển hướng sang URL mới
        const newPath = '/' + pathParts.join('/');
        window.location.href = newPath;
    }