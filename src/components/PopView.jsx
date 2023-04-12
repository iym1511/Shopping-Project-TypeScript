import { useState } from "react";
import PopModal from "./PopModal";

const PopView = () => {
    const [modalVisible, setModalVisible] = useState(true)

    const closeModal = () => {
        setModalVisible(false)
    }

    return (  
        <div>
            <>
                {modalVisible && (
                    <PopModal visible={modalVisible} closable={true} maskClosable={true} onClose={closeModal}></PopModal>
                )}
            </>
        </div>
    );
}

export default PopView;