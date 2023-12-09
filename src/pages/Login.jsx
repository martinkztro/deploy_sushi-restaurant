import React from "react";
import LoginForm from "../components/LoginForm";

export default function Login() {

    


    return (
        <div>
            <div className="loginwrapper ">
                <div className="lg-inner-column">
                    <div className="left-columns lg:w-1/2 lg:flex hidden">
                        <div className="logo-box-3">
                            <a href="index.html" className="w-full">
                                <img src="/Example.jpg" className='invert-0' alt=""/>
                            </a>
                        </div>
                    </div>
                    <div className="lg:w-1/2 w-full flex flex-col items-center justify-center">
                        <div className="auth-box-3  border border-gray-300 ">
                            <div className="mobile-logo text-center mb-3 lg:hidden block">
                                <a href="index.html">
                                    <img src="/Example.jpg" alt="" className=" w-20 mx-auto mb-5 dark_logo" />
                                </a>
                            </div>
                            <div className="text-center 2xl:mb-10 mb-5">
                                <h4 className="font-medium">
                                    Cuenta Administrativa
                                </h4>
                            </div>
                            <LoginForm />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
