function Navbar() {
  return (
    <nav className="flex justify-between p-5 bg-gray-800 sticky top-0">
      <h1 className="font-bold">My Portfolio</h1>
      <div className="space-x-4">
        <a href="#projects">Projects</a>
        <a href="#internship">Internship</a>
        <a href="#skills">Skills</a>
        <a href="#contact">Contact</a>
      </div>
    </nav>
  );
}

export default Navbar;