import Link from "next/link";
import { useState, useMemo } from "react";
import Chat from "./Chat";
const ToolBar = ({
  isSubtitle,
  setIsSubtitle,
  isSignLanguage,
  setIsSignLanguage,
  selectedLanguage,
  setSelectedLanguage,
}) => {
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isParticipantsOpen, setIsParticipantsOpen] = useState(false);

  const [participants, setParticipants] = useState([
    { name: "Duc Anh Phung", isHost: true },
    { name: "John Doe", isHost: false },
    { name: "Jane Smith", isHost: false },
  ]);
  const [isTranslating, setIsTranslating] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  const languages = [
    { code: "en", name: "English" },
    { code: "vi", name: "Tiếng Việt" },
    { code: "ja", name: "日本語" },
    { code: "ko", name: "한국어" },
    { code: "zh", name: "中文" },
    { code: "fr", name: "Français" },
    { code: "de", name: "Deutsch" },
    { code: "off", name: "Turn off" },
  ];

  const handleLanguageSelect = (langCode) => {
    setSelectedLanguage(langCode);
    setIsTranslating(true);
    setShowLanguageMenu(false);
  };

  // Memoize the current language name
  const currentLanguageName = useMemo(() => {
    const selectedLang = languages.find(
      (lang) => lang.code === selectedLanguage
    );
    return selectedLang ? selectedLang.name : "Translate";
  }, [selectedLanguage, languages]);

  return (
    <>
      {/* Chat Sidebar */}
      {isChatOpen && <Chat isChatOpen={isChatOpen} />}

      {/* Participants Sidebar */}
      {isParticipantsOpen && (
        <div className="absolute right-0 top-0 bottom-0 w-80 bg-gray-900 border-l border-gray-700 flex flex-col shadow-lg">
          <div className="p-4 border-b border-gray-700 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-white">Participants</h2>
            <button
              className="text-gray-400 hover:text-white transition duration-200"
              onClick={() => setIsParticipantsOpen(false)}
            >
              ✖️
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {participants.map((participant, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-700 px-4 py-2 rounded-lg"
              >
                <span className="text-white">{participant.name}</span>
                {participant.isHost && (
                  <span className="text-sm text-blue-400">Host</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between h-[12%] bg-gray-900 py-3 border-t border-gray-700 shadow-lg">
        <div>
          <button
            className={`mx-2 px-4 py-2 hover:bg-gray-700 rounded-lg transition duration-200`}
            onClick={() => setIsAudioOn(!isAudioOn)}
          >
            <div className="text-[20px]">{isAudioOn ? "🔊" : "🔇"}</div>
            <div className="text-white">Audio</div>
          </button>
          <button
            className={`mx-2 px-4 py-2 hover:bg-gray-700 rounded-lg transition duration-200`}
            onClick={() => setIsVideoOn(!isVideoOn)}
          >
            <div className="text-[20px]">{isVideoOn ? "📹" : "📷"}</div>
            <div className="text-white">
              {isVideoOn ? "Stop Video" : "Start Video"}
            </div>
          </button>
        </div>

        <div className="relative">
          <button
            className="mx-2 px-4 py-2 hover:bg-gray-700 rounded-lg transition duration-200"
            onClick={() => setIsChatOpen(!isChatOpen)}
          >
            <div className="text-[20px]">💬</div>
            <div className="text-white">Chat</div>
          </button>

          <button
            className="mx-2 px-4 py-2 hover:bg-gray-700 rounded-lg transition duration-200"
            onClick={() => setIsParticipantsOpen(!isParticipantsOpen)}
          >
            <div className="text-[20px]">🙋‍♂️</div>
            <div className="text-white">Participants</div>
          </button>

          <button className="mx-2 px-4 py-2 hover:bg-gray-700 rounded-lg transition duration-200">
            <div className="text-[20px]">🎥</div>
            <div className="text-white">Share</div>
          </button>
          <button
            onClick={() => setIsSubtitle(!isSubtitle)}
            className="mx-2 px-4 py-2 hover:bg-gray-700 rounded-lg transition duration-200"
          >
            <div className="text-[20px]">{isSubtitle ? "📤" : "📥"}</div>
            <div className="text-white">Subtitle</div>
          </button>

          <button
            onClick={() => setIsSignLanguage(!isSignLanguage)}
            className="mx-2 px-4 py-2 hover:bg-gray-700 rounded-lg transition duration-200"
          >
            <div className="text-[20px]">{isSignLanguage ? "🤟" : "👋"}</div>
            <div className="text-white">Sign language</div>
          </button>

          <div className="relative inline-block">
            <button
              onClick={() => setShowLanguageMenu(!showLanguageMenu)}
              className="mx-2 px-4 py-2 hover:bg-gray-700 rounded-lg transition duration-200"
            >
              <div className="text-[20px]">🌐</div>
              <div className="text-white">{currentLanguageName}</div>
            </button>

            {showLanguageMenu && (
              <div className="absolute bottom-full mb-2 right-0 w-48 bg-gray-800 rounded-lg shadow-lg border border-gray-700 py-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageSelect(lang.code)}
                    className={`w-full px-4 py-2 text-left hover:bg-gray-700 transition-colors duration-200
                      ${
                        selectedLanguage === lang.code
                          ? "bg-gray-700 text-blue-400"
                          : "text-white"
                      }`}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <Link href={"/summary"}>
          <button className="mx-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition duration-200">
            ❌ End
          </button>
        </Link>
      </div>
    </>
  );
};
export default ToolBar;
