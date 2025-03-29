class ReadingWithLee extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            loggedIn: false,
            verified: false,
            darkMode: false,
            fontSize: 16,
            chapters: [
                "Chương 1: Khởi đầu",
                "Chương 2: Cuộc hành trình",
                "Chương 3: Cuộc chạm trán",
                "Chương 4: Kết thúc"
            ],
            currentChapter: 0,
            reading: false
        };
    }

    handleLogin = () => {
        if (this.state.username.trim() && this.state.verified) {
            this.setState({ loggedIn: true });
        } else {
            alert("Vui lòng xác minh không phải robot!");
        }
    };

    verifyCaptcha = () => {
        this.setState({ verified: true });
    };

    nextChapter = () => {
        if (this.state.currentChapter < this.state.chapters.length - 1) {
            this.setState({ currentChapter: this.state.currentChapter + 1 });
        }
    };

    prevChapter = () => {
        if (this.state.currentChapter > 0) {
            this.setState({ currentChapter: this.state.currentChapter - 1 });
        }
    };

    selectChapter = (event) => {
        this.setState({ currentChapter: parseInt(event.target.value) });
    };

    toggleDarkMode = () => {
        this.setState({ darkMode: !this.state.darkMode });
    };

    increaseFontSize = () => {
        this.setState({ fontSize: this.state.fontSize + 2 });
    };

    decreaseFontSize = () => {
        this.setState({ fontSize: this.state.fontSize - 2 });
    };

    toggleReading = () => {
        const text = this.state.chapters[this.state.currentChapter];
        const speech = new SpeechSynthesisUtterance(text);
        if (!this.state.reading) {
            window.speechSynthesis.speak(speech);
        } else {
            window.speechSynthesis.cancel();
        }
        this.setState({ reading: !this.state.reading });
    };

    render() {
        return (
            <div className={this.state.darkMode ? "container dark-mode" : "container"}>
                <h1>READING WITH LEE</h1>
                {!this.state.loggedIn ? (
                    <div id="login-section">
                        <input
                            type="text"
                            value={this.state.username}
                            onChange={(e) => this.setState({ username: e.target.value })}
                            placeholder="Nhập tên người dùng"
                        />
                        <div className="g-recaptcha" data-sitekey="YOUR_RECAPTCHA_SITE_KEY" data-callback="verifyCaptcha"></div>
                        <button onClick={this.handleLogin}>Đăng nhập</button>
                    </div>
                ) : (
                    <div id="reader-section">
                        <h2 style={{ fontSize: this.state.fontSize + "px" }}>
                            {this.state.chapters[this.state.currentChapter]}
                        </h2>
                        <div className="buttons">
                            <button onClick={this.prevChapter} disabled={this.state.currentChapter === 0}>
                                Chương trước
                            </button>
                            <button onClick={this.nextChapter} disabled={this.state.currentChapter >= this.state.chapters.length - 1}>
                                Chương tiếp theo
                            </button>
                            <select onChange={this.selectChapter} value={this.state.currentChapter}>
                                {this.state.chapters.map((chapter, index) => (
                                    <option key={index} value={index}>{chapter}</option>
                                ))}
                            </select>
                        </div>
                        <div className="buttons">
                            <button onClick={this.toggleDarkMode}>
                                {this.state.darkMode ? "Chế độ sáng" : "Chế độ tối"}
                            </button>
                            <button onClick={this.increaseFontSize}>Tăng cỡ chữ</button>
                            <button onClick={this.decreaseFontSize}>Giảm cỡ chữ</button>
                            <button onClick={this.toggleReading}>
                                {this.state.reading ? "Dừng đọc" : "Đọc truyện"}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

// Render component vào #root
ReactDOM.render(<ReadingWithLee />, document.getElementById("root"));
