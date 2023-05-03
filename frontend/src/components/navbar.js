import react from 'react'

const Navbar = () =>{

    return(
        
        <header>
        <div class="nav-wrapper">
            <div class="logo-container">
                <img class="logo" src="./IMGS/logome.png" alt="Logo"/>
            </div>
            <nav>
                <input class="hidden" type="checkbox" id="menuToggle"/>
                <label class="menu-btn" for="menuToggle">
                    <div class="menu"></div>
                    <div class="menu"></div>
                    <div class="menu"></div>
                </label>
                <div class="nav-container">
                    <ul class="nav-tabs">
                        <li class="nav-tab">Home</li>
                        <li class="nav-tab">wedding</li>
                        <li class="nav-tab">Reseturant</li>
                        <li class="nav-tab">Rooms</li>
                        <li class="nav-tab">Contactus</li>
                        <li class="nav-tab">Aboutus</li>
                    </ul>
                </div>
            </nav>
        </div>
    </header>
    

    )

}

export default Navbar

