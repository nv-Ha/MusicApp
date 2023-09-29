const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const playlist = $('.songs')
const heading = $('.music-name')
const cd = $('.cd')
const audio = $('.audio')
const btnPlay = $('.btn-play')
const buttonPlay = $('.circle-play')
const progress  = $('.progress')
const btnNext = $('.fa-forward')
const btnBack = $('.fa-backward')
const shuffleActive = $('.fa-shuffle')
const rotateActive = $('.fa-rotate-right')


const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    songs: [
        {
            name: 'Chúng ta của hiện tại',
            singer: 'Sơn Tùng MTP',
            path: '/css/songs/ChungTaCuaHienTai-SonTungMTP.mp3',
            image: '/css/images/song-7.jpg'
        },
        {
            name: 'Chạy ngay Đi',
            singer: 'Sơn Tùng MTP',
            path: '/css/songs/ChayNgayDi-SonTungMTP.mp3',
            image: '/css/images/song-1.jpg'
        },
        {
            name: 'Making my way',
            singer: 'Sơn Tùng MTP',
            path: '/css/songs/MakingMyWay-SonTungMTP.mp3',
            image: '/css/images/song-2.jpg'
        },
        {
            name: 'Nơi này có anh',
            singer: 'Sơn Tùng MTP',
            path: '/css/songs/NoiNayCoAnh-SonTungMTP.mp3',
            image: '/css/images/song-3.jpg'
        },
        {
            name: 'Hãy trao cho anh',
            singer: 'Sơn Tùng MTP',
            path: '/css/songs/HayTraoChoAnh-SonTungMTP.mp3',
            image: '/css/images/song-4.jpg'
        },
        {
            name: 'Chắc có yêu là đây',
            singer: 'Sơn Tùng MTP',
            path: '/css/songs/ChacCoYeuLaDay-SonTungMTP.mp3',
            image: '/css/images/song-5.jpg'
        },
        {
            name: 'Lạc trôi',
            singer: 'Sơn Tùng MTP',
            path: '/css/songs/LacTroi-SonTungMTP.mp3',
            image: '/css/images/song-6.jpg'
        }
    ],

    render: function(){
        const htmls = this.songs.map(song =>{
            return `
                <div class="songs-nav">
                    <div class="songs-list">
                        <div class="songs-list-item">
                            <img src="${song.image}" alt="">
                        </div>
                        <div class="songs-list-item">
                            <p>${song.name}</p>
                            <p>${song.singer}</p>
                        </div>
                        <div class="songs-list-item">
                            <i class="fa-solid fa-bars"></i>
                        </div>
                    </div>
                </div>`
        })
        playlist.innerHTML = htmls.join('')
    },

    defineProperti: function(){
        Object.defineProperty(this, 'currentSong', {
            get: function(){
                return this.songs[this.currentIndex]
            }
        })
    },
    // ------

    handleEvents: function(){
        const _this= this
        const actionImgHeight = cd.offsetHeight;
        document.onscroll = function () {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const newactionImgHeight = actionImgHeight - scrollTop;
          
            cd.style.height =  newactionImgHeight + 'px'
          };

        //   ----
        buttonPlay.onclick = function () {
            if (_this.isPlaying) {
              audio.pause();
            } else {
              audio.play();
            }
          };
          // Khi song được play
          audio.onplay = function () {
            _this.isPlaying = true;
            buttonPlay.classList.add("playing");
            // cdThumbAnimate.play();
          };
      
          // Khi song bị pause
          audio.onpause = function () {
            _this.isPlaying = false;
            buttonPlay.classList.remove("playing");
            // cdThumbAnimate.pause();
          };

          //khi thoi gian bai hat thay doi
          audio.ontimeupdate = function(){
            if(audio.duration){
                const currentProgress = Math.floor(audio.currentTime / audio.duration *100)
                progress.value = currentProgress
            }
          }

        //   khi tua
           progress.onchange = function(e){
            const seektime = audio.duration / 100 * e.target.value
            audio.currentTime = seektime
           }
        //    Chuyen bai
        btnNext.onclick = function(){
            _this.nextSong()
            audio.play()
        }
        btnBack.onclick = function(){
            _this.backSong()
            audio.play()
        }
        // active color
        shuffleActive.onclick = function(){
            _this.isRandom = !_this.isRandom
            shuffleActive.classList.toggle('active', _this.isRandom)
        }
        rotateActive.onclick = function(){
            _this.isRandom = !_this.isRandom
            rotateActive.classList.toggle('active', _this.isRandom)
        }
    },

   loadCurrentSong: function(){
    heading.textContent = this.currentSong.name
    cd.style.backgroundImage = `url('${this.currentSong.image}')`
    audio.src = this.currentSong.path

    console.log(heading, cd, audio)
   },

   nextSong: function(){
    this.currentIndex++
    if(this.currentIndex >= this.songs.length){
        this.currentIndex = 0

    }
    this.loadCurrentSong()
   },

   backSong: function(){
    this.currentIndex--
    if(this.currentIndex < 0){
        this.currentIndex = this.songs.length -1
    }
    this.loadCurrentSong()
   },

    start: function(){
        // this.nextSong()
        this.defineProperti()
        this.loadCurrentSong()
        this.handleEvents()
        this.render()
    }
}

app.start()