module Main exposing (..)

import Browser
import Browser.Events exposing (onKeyUp)
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (keyCode, on, onClick, onInput)
import Json.Decode as Json



-- Model


type alias Model =
    { todos : List String, newTodo : String }


init : Model
init =
    Model [] ""



-- Update


onKeyUp : (Int -> msg) -> Attribute msg
onKeyUp key =
    on "keyup" (Json.map key keyCode)


type Msg
    = AddTodo Int
    | HandleChange String
    | RemoveTodo Int


update : Msg -> Model -> Model
update msg model =
    case msg of
        AddTodo key ->
            if key == 13 then
                { model | todos = model.todos ++ [ model.newTodo ], newTodo = "" }

            else
                model

        HandleChange newTodo ->
            { model | newTodo = newTodo }

        RemoveTodo index ->
            { model | todos = List.take index model.todos ++ List.drop (index + 1) model.todos }



--  View


viewTodo : List String -> Html Msg
viewTodo todos =
    todos |> List.indexedMap (\index val -> li [ class "item" ] [ text val, button [ onClick (RemoveTodo index) ] [ text "X" ] ]) |> ul [ class "display" ]


view : Model -> Html Msg
view model =
    div [ class "container" ]
        [ h1 [] [ text "With", span [ class "app-color" ] [ text "Elm" ] ]
        , input [ class "input", value model.newTodo, onInput HandleChange, onKeyUp AddTodo ] []
        , viewTodo model.todos
        ]


main =
    Browser.sandbox { view = view, update = update, init = init }
