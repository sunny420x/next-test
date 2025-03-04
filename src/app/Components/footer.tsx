export default function Footer() {
    return (
      <footer className="bg-grey text-grey">
        <div className="container mx-auto flex justify-center items-center py-4">
          <div>&copy; {new Date().getFullYear()} Sunny420x</div>
        </div>
      </footer>
    );
  }