import React from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { AlertTriangle } from 'lucide-react';
interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isDestructive?: boolean;
}
export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isDestructive = false
}: ConfirmDialogProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="" size="sm">
      <div className="text-center sm:text-left">
        <div
          className={`mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10 ${isDestructive ? 'bg-red-100' : 'bg-blue-100'}`}>

          <AlertTriangle
            className={`h-6 w-6 ${isDestructive ? 'text-red-600' : 'text-blue-600'}`} />

        </div>
        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
          <h3 className="text-base font-semibold leading-6 text-slate-900">
            {title}
          </h3>
          <div className="mt-2">
            <p className="text-sm text-slate-500">{message}</p>
          </div>
        </div>
      </div>
      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
        <Button
          variant={isDestructive ? 'danger' : 'primary'}
          onClick={() => {
            onConfirm();
            onClose();
          }}
          className="w-full sm:ml-3 sm:w-auto">

          {confirmText}
        </Button>
        <Button
          variant="outline"
          onClick={onClose}
          className="mt-3 w-full sm:mt-0 sm:w-auto">

          {cancelText}
        </Button>
      </div>
    </Modal>);

}