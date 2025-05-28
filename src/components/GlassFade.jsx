import React, { useState, useRef, useEffect } from 'react';
import styles from './GlassFade.module.css';

export const GlassFade = ({ 
  children, 
  className = '',
  fadeType = 'glass',
  fadeBackground = 'default', 
  showNoise = false,
  style = {},
  fadeHeight = 'auto' 
}) => {
  const [fadeState, setFadeState] = useState({
    showTop: false,
    showBottom: false,
    topOpacity: 0,
    bottomOpacity: 0,
    dynamicFadeHeight: 80 
  });
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      const scrollBottom = scrollHeight - scrollTop - clientHeight;
      const totalScrollable = scrollHeight - clientHeight;
      
      let calculatedFadeHeight = 80;
      if (fadeHeight === 'auto') {
        calculatedFadeHeight = Math.min(120, Math.max(40, clientHeight * 0.2));
      } else if (typeof fadeHeight === 'number') {
        calculatedFadeHeight = fadeHeight;
      }
      
      if (totalScrollable <= 0) {
        setFadeState({
          showTop: false,
          showBottom: false,
          topOpacity: 0,
          bottomOpacity: 0,
          dynamicFadeHeight: calculatedFadeHeight
        });
        return;
      }
      
      //opacity based on scroll position
      const scrollProgress = scrollTop / totalScrollable;
      const bottomProgress = 1 - scrollProgress;
      
      //smooth fade
      const topFadeThreshold = 0.05; //fading at 5% scroll
      const bottomFadeThreshold = 0.95; // fading at 95% scroll
      
      let topOpacity = 0;
      let bottomOpacity = 0;
      
      if (scrollProgress > topFadeThreshold) {
        topOpacity = Math.min(1, (scrollProgress - topFadeThreshold) * 2);
      }
      
      if (scrollProgress < bottomFadeThreshold) {
        bottomOpacity = Math.min(1, (bottomFadeThreshold - scrollProgress) * 2);
      }
      
      setFadeState({
        showTop: scrollTop > 10,
        showBottom: scrollBottom > 10,
        topOpacity,
        bottomOpacity,
        dynamicFadeHeight: calculatedFadeHeight
      });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      
      //initial check
      setTimeout(handleScroll, 0);
      
      //when monitor size changes
      const resizeObserver = new ResizeObserver(handleScroll);
      resizeObserver.observe(container);
      
      return () => {
        container.removeEventListener('scroll', handleScroll);
        resizeObserver.disconnect();
      };
    }
  }, [fadeHeight]);

  const getFadeClass = (isTop) => {
    const prefix = fadeType === 'feather' ? 'feather' : 'glass';
    let suffix = '';
    
    if (fadeBackground === 'transparent') {
      suffix = 'Transparent';
    } else if (fadeBackground === 'glass') {
      suffix = 'Glass';
    }
    
    const position = isTop ? 'Top' : 'Bottom';
    
    return styles[`${prefix}Fade${position}${suffix}`];
  };

  return (
    <div className={`${styles.glassFadeContainer} ${className}`} style={style}>
      <div 
        ref={containerRef}
        className={styles.scrollContainer}
      >
        {children}
      </div>
      {fadeState.showTop && (
        <div 
          className={`${getFadeClass(true)} ${styles.dynamicFade}`}
          style={{ 
            opacity: fadeState.topOpacity,
            height: `${fadeState.dynamicFadeHeight * 0.8}px`
          }}
        />
      )}
      {fadeState.showBottom && (
        <div 
          className={`${getFadeClass(false)} ${styles.dynamicFade}`}
          style={{ 
            opacity: fadeState.bottomOpacity,
            height: `${fadeState.dynamicFadeHeight}px`
          }}
        />
      )}
      {showNoise && <div className={styles.noiseOverlay} />}
    </div>
  );
};