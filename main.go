package main

import (
	"embed"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"

	"library-hub/app"
)

//go:embed all:frontend/dist
var assets embed.FS

var AllAgentKinds = []struct {
	Value  app.AgentKind
	TSNAME string
}{
	{app.STUDENT, "Student"},
	{app.TEACHER, "TEACHER"},
	{app.ASSISTANT, "Assistant"},
}

func main() {
	// Create an instance of the instance structure
	instance := app.NewApp()

	// Create application with options
	err := wails.Run(&options.App{
		Title:  "library-hub",
		Width:  1024,
		Height: 768,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		BackgroundColour: &options.RGBA{R: 27, G: 38, B: 54, A: 1},
		OnStartup:        instance.Startup,
		Bind: []interface{}{
			instance,
		},
		EnumBind: []interface{}{
			AllAgentKinds,
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}
}
