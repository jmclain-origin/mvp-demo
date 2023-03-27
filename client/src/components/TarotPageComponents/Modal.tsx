import React, { ReactElement, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { XCircle } from 'heroicons-react';

type Props = {
    children?: ReactElement | ReactElement[] | false | null;
    isShown: boolean;
    setIsShown: (isShown: boolean) => void;
};

const Modal = ({ children, isShown, setIsShown }: Props): ReactElement | null => {
    const handleEscape = (event: KeyboardEvent): any => {
        if (event.key === 'Escape') setIsShown(false);
    };
    useEffect(() => {
        if (isShown) document.addEventListener('keydown', handleEscape, false);
        return () => document.removeEventListener('keydown', handleEscape, false);
    }, [handleEscape, isShown]);
    return isShown
        ? createPortal(
              <div className="absolute inset-0 z-30">
                  <div className="fixed inset-0 bg-gray-600/60 flex justify-center items-center">
                      <div className="relative w-full mx-2  p-2 bg-neutral-900 text-white rounded">
                          <XCircle
                              className="h-12 w-12 absolute -right-2 -top-2 cursor-pointer text-neutral-200"
                              onClick={() => setIsShown(false)}
                          />
                          {children}
                      </div>
                  </div>
              </div>,
              document.body,
          )
        : null;
};

export default Modal;
