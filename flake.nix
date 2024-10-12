{
  description = "Go Template";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = {
    nixpkgs,
    flake-utils,
    ...
  }:
    flake-utils.lib.eachDefaultSystem (
      system: let
        pkgs = nixpkgs.legacyPackages.${system};

        nativeBuildInputs = with pkgs; [
          go
          gopls
          
          # wails dependencies
          gtk3
          webkitgtk
          nodejs_22

          # js lsp/lint
          biome

          ### Python stuff
          python312
          python312Packages.polars

          python312Packages.python-lsp-ruff
          python312Packages.python-lsp-black
          python312Packages.python-lsp-server

          ## sqlite (for sqlite3 client)
          sqlite
        ];
        buildInputs = with pkgs; [
          # Desktop App builder
          wails

          # wails optional dependencies
          upx
          nsis
        ];
      in {
        devShells.default = pkgs.mkShell {inherit nativeBuildInputs buildInputs;};

        packages.default = pkgs.buildGoModule rec {
          name = "template";
          src = ./cmd;

          inherit buildInputs;

          vendorHash = null;
        };
      }
    );
}
