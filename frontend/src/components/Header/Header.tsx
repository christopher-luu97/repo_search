export function Header() {
  return (
    <nav className="p-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <header className="text-white font-bold text-xl">
            Repo Search and QNA
          </header>
          <ul className="flex space-x-4">
            <li>
              <a
                href="https://github.com/"
                className="text-white hover:text-gray-300"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/"
                className="text-white hover:text-gray-300"
              >
                Social
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
