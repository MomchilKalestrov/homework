const Header = () => {
    return (
        <header style={{ padding: '1rem', backgroundColor: '#282c34', color: 'white' }}>
            <h1>My React Blog</h1>
            <nav>
                <a href="#home" style={{ marginRight: '1rem', color: 'white' }}>Home</a>
                <a href="#about" style={{ color: 'white' }}>About</a>
            </nav>
        </header>
    )
}

export default Header
