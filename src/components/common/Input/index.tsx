import React, {
  ChangeEvent,
  PropsWithChildren,
  forwardRef,
  useEffect,
  useState,
} from 'react';
import styles from './input.module.scss';

interface InputProps {
  placeHolder: string;
  type: string;
  isModifying?: boolean;
  setIsModifying?: (isModifying: boolean) => void;
  value?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onChange?: (value: string) => void;
}

const Input = forwardRef<HTMLInputElement, PropsWithChildren<InputProps>>(
  (props, ref) => {
    const {
      placeHolder,
      type,
      isModifying = false,
      setIsModifying,
      value,
      onKeyDown,
      onChange,
    } = props;

    const [inputValue, setInputValue] = useState<string>(value || '');
    const [placeholder, setPlaceholder] = useState<string>(props.placeHolder);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (ref && typeof ref !== 'function' && ref.current) {
          if (!ref.current.contains(event.target as Node)) {
            setIsModifying && setIsModifying(true);
            setPlaceholder('');
          } else {
            setIsModifying && setIsModifying(false);
          }
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [setIsModifying]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      // input이 변경될 때마다 호출
      const value = e.target.value;
      onChange && onChange(value);

      setInputValue(value);
    };

    return (
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <input
            ref={ref}
            className={`${styles.inputArea} ${isModifying ? styles.modifyingArea : ''}`}
            type={type}
            value={inputValue}
            placeholder={placeholder}
            onChange={handleInputChange}
            onKeyDown={onKeyDown}
          />
          <span className={styles.label}>{placeHolder}</span>
        </div>
      </div>
    );
  },
);

Input.displayName = 'CustomInput';

export default Input;
