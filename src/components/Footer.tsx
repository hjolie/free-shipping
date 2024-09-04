const Footer = () => {
    return (
        <footer className="fixed bottom-0 left-0 right-0 bg-gray-800 text-gray-300 p-4 md:p-6 lg:p-8 z-40 shadow-lg">
            <div className="container mx-auto max-w-1200 flex items-center justify-center space-y-8 md:space-y-0 md:space-x-10">
                <p className="text-center">
                    Copyright © {new Date().getFullYear()} 免運GO｜免運購
                </p>
            </div>
        </footer>
    );
};

export default Footer;
