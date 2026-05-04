import React from "react";
import { useParams } from 'react-router-dom';
import { auth, db } from "../middleware/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";


const ReferralsPage = () => {

    // get referral code from url param
    const { referralCode } = useParams();

    // async function for google sign in
    const AuthForm = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const userCred = await signInWithPopup(auth, provider);

            // Save user info to Firestore (only on first signup)
            await setDoc(
                doc(db, "referrals", userCred.user.uid),
                {
                email: userCred.user.email,
                createdAt: new Date().toISOString(),
                provider: "google",
                referralCode: referralCode
                },
                { merge: true } // won't overwrite existing data
            );

            alert("Your referral code has been recorded. Thank you!");

            } catch (err: unknown) {
            if (err instanceof Error) {
                alert(err.message);
            } else {
                alert("Google sign-in failed.");
            }
        }
    };           

    return (
        <>
        <div className="relative bg-gradient-to-br from-primary via-primary-light to-primary-dark overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="pt-20 pb-10 md:pt-24 md:pb-14">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
                <span className="block">Referrals</span>
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="md:mt-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-lg tracking-widest">
        <div className="max-w-2xl mx-auto">
            <div className="flex flex-col">
                <h3 className="text-xl mb-6">Welcome to the Referrals Page</h3>
                <p>Please sign in below using your Google account and the referral code will be recorded automatically</p>
                <p className="mt-8">Thank you</p>
                <button type="button" onClick={AuthForm} className="mt-20 bg-blue-500 hover:bg-blue-700 text-white font-bold w-fit py-2 px-4 rounded-md">
                    Sign in with Google
                </button>
            </div>            
            </div>
        </div>        
        </>
    );
}

export default ReferralsPage;