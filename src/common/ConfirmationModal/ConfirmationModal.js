import MyModal from 'common/MyModal/MyModal';
import {TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  TextNormal,
  TextNormalSemiBold,
} from 'common/Text/TextFont';
import styles from './styles';
import strings from 'localization/Localization';

const ConfirmationModal = ({
  isOpen,
  onCancel,
  children,
  onConfirm,
  textContent,
  title,
  textButtonConfrim,
  isWarning,
  isQuestion,
  isConfriming,
  isDisableConfirm,
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const handleConfirmClick = () => {
    setIsClicked(true);
    onConfirm();
  };
  useEffect(() => {
    if (isClicked === true) {
      setTimeout(() => {
        setIsClicked(false);
      }, 2000);
    }
  }, [isClicked]);
  return (
    <MyModal visible={isOpen} onPressOutSide={() => {}}>
      <View
        style={
          children ? styles.containerModalWithChildren : styles.containerModal
        }>
        <View style={styles.headerModal}>
          <TextNormalSemiBold style={{fontSize: 20}}>
            {title || strings.common.notification}
          </TextNormalSemiBold>
        </View>

        {children ? (
          <View style={styles.containerChildren}>{children}</View>
        ) : (
          <View style={styles.wrapperContentConfirm}>
            <TextNormal style={styles.textContents}>{textContent}</TextNormal>
          </View>
        )}

        {isWarning === true && (
          <View style={styles.wrapperActionWarning}>
            <TouchableOpacity style={styles.buttonCancel} onPress={onCancel}>
              <TextNormalSemiBold style={styles.modalButtonCancelText}>
                {strings.common.back}
              </TextNormalSemiBold>
            </TouchableOpacity>
          </View>
        )}
        {isQuestion && (
          <View style={styles.wrapperButtonSection}>
            <TouchableOpacity style={styles.buttonBack} onPress={onCancel}>
              <TextNormalSemiBold style={styles.modalButtonCancelText}>
                {strings.common.back}
              </TextNormalSemiBold>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={isDisableConfirm === true || isClicked === true}
              style={styles.buttonOk}
              onPress={() => handleConfirmClick()}>
              <TextNormalSemiBold style={styles.modalButtonOkText}>
                {strings.common.confirm}
              </TextNormalSemiBold>
            </TouchableOpacity>
          </View>
        )}
        {isConfriming && (
          <View style={styles.wrapperActionWarning}>
            <TouchableOpacity
              disabled={isDisableConfirm === true || isClicked === true}
              style={styles.buttonConfirm}
              onPress={() => handleConfirmClick()}>
              <TextNormalSemiBold style={styles.modalButtonOkText}>
                {textButtonConfrim ? textButtonConfrim : strings.common.confirm}
              </TextNormalSemiBold>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </MyModal>
  );
};

export default ConfirmationModal;
