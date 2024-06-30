import Modal from "react-modal";
Modal.setAppElement("#root");
import { Image } from "../../apiService/images";
interface ImageModalProps {
  isOpen: boolean;
  isClose: () => void;
  value: Image;
}

export default function ImageModal({
  isOpen,
  isClose,
  value,
}: ImageModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={isClose}
      style={{
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          transform: "translate(-50%, -50%)",
        },
        overlay: {
          backgroundColor: "rgba(0,0,0,0.75)",
        },
      }}
    >
      {value && (
        <img
          style={{
            height: "80vh",
          }}
          src={value.urls.full}
          alt={value.alt_description}
        />
      )}
    </Modal>
  );
}
