import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { storyData } from '../data/StoryData';
import { HiX, HiChevronLeft, HiChevronRight } from 'react-icons/hi';

function Stories({ id }) {
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  useEffect(() => {
    if (isViewerOpen) {
      const timer = setTimeout(() => {
        handleNextStory();
      }, storyData[currentUserIndex].stories[currentStoryIndex].duration);
      return () => clearTimeout(timer);
    }
  }, [isViewerOpen, currentUserIndex, currentStoryIndex]);

  const openViewer = (userIndex) => {
    setCurrentUserIndex(userIndex);
    setCurrentStoryIndex(0);
    setIsViewerOpen(true);
  };

  const closeViewer = () => {
    setIsViewerOpen(false);
  };
  
  const handleNextStory = () => {
    const currentUser = storyData[currentUserIndex];
    if (currentStoryIndex < currentUser.stories.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
    } else if (currentUserIndex < storyData.length - 1) {
      setCurrentUserIndex(currentUserIndex + 1);
      setCurrentStoryIndex(0);
    } else {
      closeViewer();
    }
  };

  const handlePrevStory = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
    } else if (currentUserIndex > 0) {
      const prevUserIndex = currentUserIndex - 1;
      setCurrentUserIndex(prevUserIndex);
      setCurrentStoryIndex(storyData[prevUserIndex].stories.length - 1);
    }
  };

  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "name": "Perenk Petshop Sevimli Dostlarımızın Hikayeleri",
    "description": "Müşterilerimizin ve mağazamızın sevimli sakinlerinin en son maceraları ve mutlu anları.",
    "image": storyData.flatMap(user => 
      user.stories.map(story => ({
        "@type": "ImageObject",
        "contentUrl": story.url,
        "name": user.name,
        "description": story.altText,
        "author": {
          "@type": "Organization",
          "name": "Perenk Petshop"
        }
      }))
    )
  };

  return (
    <section id={id} className="w-full bg-brand-light-turquoise py-20 px-4">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(jsonLdData)}
        </script>
      </Helmet>
      
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-dark-turquoise mb-4">
          Hikayelerimiz
        </h2>
        <p className="font-sans text-brand-dark-turquoise/80 mb-12 max-w-2xl mx-auto">
          Mağazamızın sevimli sakinlerinden ve mutlu müşterilerimizden en son haberler.
        </p>
        
        <div className="flex items-center justify-center gap-6 md:gap-8">
          {storyData.map((user, index) => (
            <div key={user.id} className="text-center">
              <button 
                onClick={() => openViewer(index)}
                className="p-1 rounded-full bg-gradient-to-tr from-yellow-400 to-fuchsia-600 hover:scale-110 transition-transform duration-300"
              >
                <div className="bg-white p-1 rounded-full">
                  <img 
                    src={user.profilePicture} 
                    alt={user.name} 
                    className="h-20 w-20 md:h-24 md:w-24 rounded-full object-cover"
                  />
                </div>
              </button>
              <p className="mt-2 font-sans font-semibold text-brand-dark-turquoise">{user.name}</p>
            </div>
          ))}
        </div>
      </div>

      {isViewerOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
          <div className="relative w-full h-full max-w-md max-h-[95vh] bg-neutral-900 rounded-lg overflow-hidden">
            <div className="absolute top-2 left-2 right-2 flex gap-1">
              {storyData[currentUserIndex].stories.map((story, index) => (
                <div key={story.id} className="h-1 flex-1 bg-white/30 rounded-full">
                  <div 
                    className="h-full bg-white rounded-full"
                    style={{ width: index < currentStoryIndex ? '100%' : (index === currentStoryIndex ? '100%' : '0%'), transition: index === currentStoryIndex ? `width ${story.duration}ms linear` : 'none' }}
                  />
                </div>
              ))}
            </div>
            
            <img 
              src={storyData[currentUserIndex].stories[currentStoryIndex].url}
              alt={storyData[currentUserIndex].stories[currentStoryIndex].altText}
              className="w-full h-full object-cover"
            />
            
            <button onClick={handlePrevStory} className="absolute left-0 top-1/2 -translate-y-1/2 text-white/80 p-4"><HiChevronLeft size={32} /></button>
            <button onClick={handleNextStory} className="absolute right-0 top-1/2 -translate-y-1/2 text-white/80 p-4"><HiChevronRight size={32} /></button>

            <div className="absolute top-6 left-4 flex items-center gap-3">
               <img src={storyData[currentUserIndex].profilePicture} alt={storyData[currentUserIndex].name} className="h-10 w-10 rounded-full object-cover border-2 border-white/80"/>
               <p className="text-white font-bold">{storyData[currentUserIndex].name}</p>
            </div>
            <button onClick={closeViewer} className="absolute top-4 right-4 text-white/80 p-2"><HiX size={32} /></button>
          </div>
        </div>
      )}
    </section>
  );
}

export default Stories;