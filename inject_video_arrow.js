const fs = require('fs');

const files = ['livre.html', 'livre-en.html', 'livre-es.html'];

const cssCode = `
    /* Custom Play Button Desktop */
    .custom-play-btn {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 80px;
      height: 80px;
      background: rgba(10, 10, 10, 0.7);
      border: 2px solid var(--gold);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 10;
      transition: all 0.4s ease;
      box-shadow: 0 0 20px rgba(201, 162, 77, 0.2);
    }
    .custom-play-btn:hover {
      background: rgba(201, 162, 77, 0.2);
      transform: translate(-50%, -50%) scale(1.1);
      box-shadow: 0 0 30px rgba(201, 162, 77, 0.4);
    }
    .custom-play-btn svg {
      width: 30px;
      height: 30px;
      fill: var(--gold);
      margin-left: 5px;
      transition: all 0.4s ease;
    }
    .custom-play-btn:hover svg {
      fill: #fff;
    }
    @media (max-width: 1000px) {
      .custom-play-btn {
        display: none !important;
      }
    }
`;

const htmlCode = `
          <div class="custom-play-btn" onclick="const v=this.previousElementSibling; v.play();">
            <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          </div>
          <script>
            (function(){
               const btn = document.currentScript.previousElementSibling;
               const vid = btn.previousElementSibling;
               if(vid && btn) {
                   vid.addEventListener('play', () => btn.style.display='none');
                   vid.addEventListener('pause', () => { if(window.innerWidth > 1000) btn.style.display='flex'; });
               }
            })();
          </script>`;

files.forEach(file => {
    if (!fs.existsSync(file)) {
        console.log("File not found: " + file);
        return;
    }
    let content = fs.readFileSync(file, 'utf8');

    // Inject CSS if not there
    if (!content.includes('.custom-play-btn')) {
        // Find </style> to inject CSS
        content = content.replace('</style>', cssCode + '\n  </style>');
    }

    if (!content.includes('position: relative;') && content.includes('.video-box {')) {
        content = content.replace('.video-box {', '.video-box {\n      position: relative;');
    }

    // Inject HTML if not there
    if (!content.includes('class="custom-play-btn"')) {
        content = content.replace('</video>', '</video>' + htmlCode);
    }

    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated ' + file);
});
console.log("Done.");
