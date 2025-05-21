import React from 'react';
import CustomScrollbar from 'src/components/CustomScrollbar';

/**
 * ModalScrollbar - A wrapper around CustomScrollbar with consistent settings for modals
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Content to be scrolled
 * @param {Object} props.style - Additional styles to apply
 * @param {number} props.fadeHeight - Height of the fade effect (default: 40)
 * @param {boolean} props.showHorizontalScroll - Whether to enable horizontal scrolling (default: false)
 * @returns {JSX.Element} The scrollbar component
 */
const ModalScrollbar = ({ 
  children, 
  style = {}, 
  fadeHeight = 40,
  showHorizontalScroll = false 
}) => {
  return (
    <CustomScrollbar
      fadeBackground="transparent"
      fadeHeight={fadeHeight}
      style={{ 
        height: '100%',
        ...style
      }}
      showHorizontalScroll={showHorizontalScroll}
    >
      {children}
    </CustomScrollbar>
  );
};

export default ModalScrollbar;