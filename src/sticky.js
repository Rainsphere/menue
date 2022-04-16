export function setupStickyListener(menue){
      
    window.addEventListener('scroll', function(){
        const scrollTop = window.pageYOffset || window.scrollY;
        const desktopStickyClass =  menue.$options.desktopStickyClass;

        if(scrollTop >= menue.$options.desktopStickyOffset)
        {
            if(!menue._desktopMenu.classList.contains(desktopStickyClass))
            {
                menue._desktopMenu.classList.add(desktopStickyClass);
                menue.$options.onDesktopStickyChange(menue);
            }
            
        }
        else
        {
            if(menue._desktopMenu.classList.contains(desktopStickyClass))
            {
                menue._desktopMenu.classList.remove(desktopStickyClass);
                menue.$options.onDesktopStickyChange(menue);
            }
        }
    });
};

export function removeStickyListener()
{
    window.removeEventListener('scroll');
}