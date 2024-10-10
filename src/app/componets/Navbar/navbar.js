'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation'
import { LuSettings } from 'react-icons/lu';
import { BsCart3 } from 'react-icons/bs';

export default function Navbar(props) {
    let { navClass, navJustify } = props;
    let [isMenu, setisMenu] = useState(false);
    
    let [manu , setManu] = useState('');
    let pathname = usePathname();
    
    useEffect(()=>{
        setManu(pathname)

        function windowScroll() {
            const navbar = document.getElementById("topnav");
            if (
                document.body.scrollTop >= 50 ||
                document.documentElement.scrollTop >= 50
            ) {
                if (navbar !== null) {
                    navbar?.classList.add("nav-sticky");
                }
            } else {
                if (navbar !== null) {
                    navbar?.classList.remove("nav-sticky");
                }
            }
        }
        window.addEventListener("scroll", windowScroll);
        window.scrollTo(0, 0)
        return () => {
            window.removeEventListener('scroll', windowScroll);
        };

    },[setManu])
    

    const toggleMenu = () => {
        setisMenu(!isMenu);
        if (document.getElementById("navigation")) {
            const anchorArray = Array.from(document.getElementById("navigation").getElementsByTagName("a"));
            anchorArray.forEach(element => {
                element.addEventListener('click', (elem) => {
                    const target = elem.target.getAttribute("href")
                    if (target !== "") {
                        if (elem.target.nextElementSibling) {
                            var submenu = elem.target.nextElementSibling.nextElementSibling;
                            submenu.classList.toggle('open');
                        }
                    }
                })
            });
        }
    };


    return (
        <nav id="topnav" className={`defaultscroll ${navClass === "nav-light" ? '' : navClass === "nav-sticky" ?
        'bg-white dark:bg-slate-900' : ''}`}>
        <div className="container relative">
            {
                navClass === "nav-light" ?
                    <Link className="logo" href="/index">
                        <span className="inline-block dark:hidden">
                            <Image src='/images/logo-dark.png' className="l-dark" width={200} height={100}  alt="" />
                            <Image src='/images/logo-light.png' className="l-light" width={200} height={100} alt="" />
                        </span>
                        <Image src='/images/logo-light.png' width={200} height={100} className="hidden dark:inline-block" alt="" />
                    </Link>
                    :
                    <Link className="logo" href="#">
                        <Image src='/images/logo-dark.png' width={200} height={100} className="inline-block dark:hidden" alt="" />
                        <Image src='/images/logo-light.png' width={200} height={100} className="hidden dark:inline-block" alt="" />
                    </Link>
            }

            <div className="menu-extras">
                <div className="menu-item">
                    <Link href="#" className={`navbar-toggle ${isMenu ? 'open' : ''}`} id="isToggle" onClick={() => toggleMenu()}>
                        <div className="lines">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </Link>
                </div>
            </div>

            
           
            <div id="navigation" style={{ display: isMenu ? 'block' : 'none' }}>
                <ul className={`navigation-menu ${navClass} ${navJustify}`}>
                    <li className={manu === "/index" || "" ? "active" : ""}>
                        <Link href="index" >Home</Link>
                    </li>
                    <li className={manu === "/page-services" || "" ? "active" : ""}>
                        <Link href="page-services" >Features</Link>
                    </li>

                    <li className={manu === "/page-pricing" || "" ? "active" : ""}><Link href="page-pricing">Pricing</Link>
                    </li>

                    <li className={manu === "/blog" || "" ? "active" : ""}><Link href="blog">Blog</Link>
                    </li>

                    <li className={manu === "/page-aboutus" || "" ? "active" : ""}>
                        <Link href="page-aboutus">About Us</Link>
                    </li>
                    <li className={manu === "/contact-one" || "" ? "active" : ""}><Link href="contact-one" className="sub-menu-item">Contact</Link></li>
                    <li className={manu === "/auth-signup" || "" ? "active" : ""}><Link href="/auth-signup" className="py-2 px-5 inline-flex items-center font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-indigo-600 hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700 text-white rounded-md mt-4"><FiPhone className="me-1 text-lg"/> Get Started</Link>
                 </ul>
            </div>
        </div >
    </nav >
    )
}
