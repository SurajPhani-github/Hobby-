import React from 'react';
import { useStore } from '../store/useStore';

interface ChallengeParticipantsProps {
  challengeId: string;
  challengeTitle: string;
  onClose: () => void;
}

const ChallengeParticipants: React.FC<ChallengeParticipantsProps> = ({
  challengeId,
  challengeTitle,
  onClose,
}) => {
  const { getRegistrationsByChallenge } = useStore();
  const participants = getRegistrationsByChallenge(challengeId);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Participants - {challengeTitle}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="space-y-4">
          {participants.map((participant) => (
            <div key={participant.id} className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{participant.name}</h3>
                  <p className="text-sm text-gray-600">{participant.email}</p>
                </div>
                <div className="text-sm text-gray-500">
                  Registered on: {new Date(participant.registrationDate).toLocaleDateString()}
                </div>
              </div>
              <div className="mt-2">
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Experience:</span> {participant.experience}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Motivation:</span> {participant.motivation}
                </p>
                {participant.portfolio && (
                  <a
                    href={participant.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline"
                  >
                    View Portfolio
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChallengeParticipants; 