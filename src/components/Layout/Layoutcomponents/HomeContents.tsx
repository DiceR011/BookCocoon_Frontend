import React from 'react';

const HomeContents: React.FC = () => {
    return (
        <div>
            <div className="flex items-center justify-center h-screen">
                <div className="text-center p-6 max-w-screen-md sm:max-w-screen-lg w-full">
                    {/* 見出し: "本の蛹 - Book Cocoon へようこそ" */}
                    <h1 className="sm:text-6xl text-4xl font-bold text-gray-800 mb-4 fade animate-fadeIn">
                        本の蛹 - Book Cocoon へようこそ
                    </h1>

                    {/* 副題: "本を効率的に読み、蛹の殻を破りましょう" */}
                    <p className="text-lg mt-10 text-gray-600 mb-6 animate-fadeInDelayed">
                        本を効率的に読み、蛹の殻を破りましょう
                    </p>
                    
                </div>
            </div>
        </div>
    );
};

export default HomeContents;
